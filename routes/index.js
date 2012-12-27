var http = require("http");
var db = require("../controllers/database");
var palo = require('../controllers/palo');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.login = function(req,res){
    res.send(palo.server.login());
    /*db.getInstance().llen('olap:servers',function(err,result){
                            if (err) throw 'err';
                            if (!result){
                                res.send(404,JSON.stringify({text:'record not exists'}));
                            }
                            else{
                                res.send(200,result);
                            }
                            
                        });
    */
};