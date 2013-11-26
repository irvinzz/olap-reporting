//var redis = require('../controllers/database.js')();
var redis = require('redis').createClient();
var _ = require('underscore');
function onGetResult(){
}
var post_index;
function errPass(err,reply,cb){
    
}
var fields = ['server','database','cube','paths','name'];
module.exports = {
    get_index : function(req,res){
        var limit = +req.query.limit || 25;
        var page = Math.max(+req.query.page-1,0) || 0;
        redis.hkeys('coordinates',function(err,reply){
            if (!err){
                if (reply.length===0){
                    res.json({
                        success: true,
                        total: 0,
                        rows: []
                    });
                }else{
                    onGetKeys(reply);
                }
            }else{
                res.json({
                    success: false,
                    err: err
                });
            }
        });
        var length = 0;
        function onGetKeys(keys){
            var rkeys = [];
            var left = Math.min(keys.length, page*limit);
            var right = Math.min(keys.length, (page+1)*limit);
            console.log(left + ' < ' + right);
            length = right-left;
            for (var i=left;i<right;i++){
                rkeys.push(keys[i]);
            }
            var result=[];
            
            var k = 0;
            //  Быдлокод какойто =/
            if (rkeys.length===0){
                return res.json({
                    success: true,
                    total: keys.length,
                    rows: []
                });
            }
            (function getRecord(){
                redis.hgetall('coordinate:'+rkeys[k],function(err,reply){
                    if (!err){
                        reply.id = rkeys[k];
                        result.push(reply);
                    }
                    if (++k<length){
                        getRecord();
                    }else{
                        res.json({
                            success: true,
                            total: keys.length,
                            rows: result
                        });
                    }
                });                
            })();
        }
    },
    get_id: function(req,res,id){
        redis.hgetall('coordinate:'+id,function(err,reply){
            reply.id = id;
            if (!err){
                res.json({
                    success: true,
                    total: 1,
                    rows: [reply]
                });
            }else{
                res.json({
                    success: false,
                    msg: err
                });
            }
        });
    },
    post_index: function(req,res){
        function onSaveId(id){
            var rec = {};
            for (var i=0;i<fields.length;++i){
                rec[fields[i]]=req.body[fields[i]];
            }
            redis.hmset('coordinate:'+id,rec,function(err,reply){
                rec.id = id;
                if (!err){
                    res.json({
                        success: true,
                        total: 1,
                        rows: [rec]
                    });
                }else{
                    res.json({
                        success: false
                    });
                }
            });
        }
        function onIncr(id){
            var obj = {};
            obj[id]='';
            redis.hmset('coordinates',obj,function(err,reply){
                if (!err){
                    onSaveId(id);
                }
            });
        }
        redis.incr('coordinate.id',function(err,reply){
            if (!err){
                onIncr(+reply);
            }else{
                res.json({
                    success: false,
                    err: err
                });
            }
        });
    },
    post_id: function(req,res,id){
        post_index(req,res);
    },
    put_id: function(req,res,id){
        var rec = {};
        for (var i=0;i<fields.length;++i){
            rec[fields[i]]=req.body[fields[i]];
        }
        rec.id=id;
        redis.hmset('coordinate:'+id,rec,function(err,reply){
            if (!err){
                res.json({
                    success: true,
                    total: 1,
                    rows: rec
                });
            }else{
                res.json({
                    success: false,
                    msg: err
                });
            }
        });
    },
    delete_id: function(req,res,id){
        redis.hdel('coordinates',id,function(){
            
        });
        redis.del('coordinate:'+id,function(err,reply){
            res.json({
                success: reply==1,
                rows: err || reply
            });
        });
    }
};



































