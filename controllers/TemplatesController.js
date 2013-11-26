var mongo = require('../controllers/mongo');
var mongorest = require('../controllers/mongorest');

var rest = mongorest({
    object: 'Template',
    schema: mongo.schemas.Variable
});

rest.get_id_variables = function(req,res,id){
    mongo.models.Variable.find({
        template: id
    },function(err,vars){
        if (!!err) return res.json({
            success: false,
            msg: err
        });
        res.json({
            success: true,
            total: vars.length,
            rows: vars
        });
    });
};
rest.post_id_variables = function(req,res,id){
    var v = new mongo.models.Variable({
        name: req.body.name,
        type: req.body.type,
        hint: req.body.hint,
        template: id
    });
    v.save(function(err,doc){
        res.json({
            success: !err,
            msg: err,
            rows: doc
        });
    });
};

rest.put_id_variables_vid = function(req,res,id,vid){
    mongo.models.Variable.findById(vid,function(err,variable){
        if (!!err) return res.json({
            success: false,
            msg:err
        });
        variable.name = req.body.name;
        variable.type = req.body.type;
        variable.hint = req.body.hint;
        variable.save(function(err,doc){
            res.json({
                success: !err,
                msg: err
            });
        });
    });
};

rest.delete_id_variables_vid = function(req,res,id,vid){
    mongo.models.Variable.findByIdAndRemove(vid, function(err,doc){
        res.json({
            success: !err,
            msg: err
        });
    });
};

module.exports = rest;

/*var mongo = require('../controllers/mymongo.js')();

var TemplateSchemaName = 'Template';

console.log(mongo.schemas.Template);

var rest = mongo.REST({
    object: TemplateSchemaName,
    schema: mongo.schemas.Template
});

var fields = mongo.fields.Template;

rest.post_index = function(req,res){
    
    var e = mongo.schemas[TemplateSchemaName];
    var i = new e();
    for (var f in fields){
        i[fields[f]] = req.body[fields[f]] || i[fields[f]];
    }
    i.save(function(err,record){
        if (!err){
            res.json({
                success: true,
                total: 1,
                rows: [record]
            });
        }else{
            res.json({
                success: false,
                total: 0,
                msg: err
            });
        }
    });
    //res.json(req.body);
};
rest.post_index_id = function(req,res,id){
    rest.post_index(req,res);
};

module.exports = rest;*/

/*
var CommonData = require('./CommonData.js');
var TemplatesCtrl = new CommonData({
    prefix: 'Templates',
    fields: ['name','content','binds']
});
module.exports = TemplatesCtrl;
*/






































