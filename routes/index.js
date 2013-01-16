var http = require("http");
var db = require("../controllers/database");
var palo = require('../controllers/libs');
var MD5 = require('MD5');
/*
 * GET home page.
 */
var paloList = {};

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.login = function(req,res){
    palov.server.info(null,function(err,result){
        res.send(result);
    });
};

exports.api = function(req,res){
	/*var id = req.session.paloKey;
	
	if ((id===undefined)||(paloList[id]===undefined)){
		var newKey = Math.random()*99999;
		var newBase = new palo.paloClass({
			host: 'olap.rts-ugra.ru',
			port: 7921
		});
		req.session.paloKey = newKey;
		paloList[newKey] = newBase;
	}
	
	var palov=paloList[req.session.paloKey];
	*/
   var palov = new palo.paloClass({
		host: 'olap.rts-ugra.ru',
		port: 7921
	});
		
		
    var e = req.params.entry;
    var r = req.params.request;
    if (palov[e][r]){
         palov[e][r](req.query,function(err,result){
            if (!err){
                if (typeof(result)===typeof({})){
                    res.json(result);
                }else{
                    res.send(result);
                }
            }else{
                res.send(500,'Internal Server Error: <br/>'+result);
            }
        });
    }else{
        res.send(501,"Not Implemented Yet");
    }
};

