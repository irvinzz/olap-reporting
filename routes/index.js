var http = require("http");
var db = require("../controllers/database");
var palo = require('../controllers/libs');
var MD5 = require('MD5');
/*
 * GET home page.
 */


exports.index = function(req, res){
  res.render('index', { title: 'Olap Report Builder Application' });
};

exports.api = function(req,res){
    var e = req.params.entry;
    var r = req.params.request;
    
    req.paloClient.call(e,r,{
        query: req.query
    },function(err,result){
        if (!err){
            if (typeof(result)===typeof({})){
                res.json(result);
            }else{
                res.send(result);
            }
        }else{
            if (typeof err !== 'number') err=500;
            var errorid = +result.split(';')[0];
            res.json(+err,[result,palo.errorHandler[errorid]]);
        }
    });
};
/*
exports.adminUI = function(req,res){
    if (req.isAuthenticated()){
        res.render('adminUI', {title: 'Olap Admin Menu'});
    }else{
        res.redirect('/login');
    }
    
};*/








































