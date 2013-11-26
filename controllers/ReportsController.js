var mongo = require('../controllers/mongo');
var mongorest = require('../controllers/mongorest');
var async = require('async');
var phantom = require('phantom');
var phjs;
phantom.create({port: 12345},function(ph){
    console.log('phantomjs initiated');
    phjs = ph;
});
var jade = require('jade');
var rest = mongorest({
    object: 'Report',
    schema: mongo.schemas.Report
});
var r = mongo.models.Report;
var b = mongo.models.Bind;
var v = mongo.models.Variable;
var t = mongo.models.Template;

var cjade = {
    
};

rest.get_id_render_pdf = function(req,res,id){
    //  переработать этот костыль
    var x = req.url.split('/');
    x.pop();
    var url = 'http://'+req.headers.host + x.join('/');
    phjs.createPage(function(page) {
        if (!page) return res.json({
            success: false,
            msg: 'cannot create page'
        });
        page.open(url, function (status) {  //  в этом месте
            if (status == "success") {
                var output = __dirname+'/../public/test.pdf';
                setTimeout(function() {
                    page.set('paperSize',{ format: 'A4', orientation: 'portrait', border: '1cm' },function(){
                        page.render(output,function cb(){
                            res.redirect('/test.pdf');
                        });
                    });
                }, 2000);
            }
        });
    });
};

rest.get_id_render = function(req, res, id) {
    function eh(e) {
        if ( !! e) {
            res.json({
                success: false,
                msg: e
            });
            return false;
        }
        else {
            return true;
        }
    }
    r.findById(id, function(err, report) {
        if (eh(err)) {
            t.findById(report.template, function(err, template) {
                if (eh(err)) {
                    v.find({
                        template: template._id
                    }, function(err, vars) {
                        if (eh(err)) {
                            async.map(vars, function handler(el, cb) {
                                b.findOne({
                                    report: report._id,
                                    variable: el._id
                                }, function(err, bind) {
                                    if (bind !== null) {
                                        if (eh(err)) {
                                            cb(null, [el.name, bind.link]);
                                        }
                                    }
                                    else {
                                        cb(true, null);
                                    }
                                });
                            }, function callback(err, els) {
                                console.log(els);
                                var r = {};
                                for (var i = 0; i < els.length; i++) {
                                    if (els[i] === null) continue;
                                    var key = els[i][0];
                                    var val = els[i][1];
                                    r[key] = val;
                                }
                                if (cjade[template._id]===undefined){
                                    cjade[template._id] = jade.compile(template.text,{});
                                }
                                var html = cjade[template._id](r);
                                res.send(html);
                            });
                        }
                    });
                }
            });
        }
    });
};

module.exports = rest;
