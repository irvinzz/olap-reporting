(function(){
    var redis = require('../controllers/database.js')();
    var palo = require('../controllers/libs.js');
    var dbctrl = function(data,options){
        var id = data.params.id;
        var _this = this;
        this.GET = function(callback){
            var includeDeleted = data.query.includeDeleted;
            var r=[];
            var ri=0;
            var rt=0;
            function getRecord(key,c){
                redis.hmget(key,options.fieldList,function(err,r){
                    if (!err){
                        var obj = {};
                        for (var i = 0; i < options.fieldList.length; i++){
                            obj[options.fieldList[i]] = r[i];
                        }
                        obj.id = key.split(':')[1];
                        c(null,obj);
                    }else{
                        c(err,null);
                    }
                });
            }
            function onGetRecord(err,result){
                if (!err){
                    if (includeDeleted==='true' || result.deleted!=='true'){
                        r.push(result);
                    }
                    ri++;
                    if (ri===rt) callback(null,r);
                }else{
                    callback(500,err);
                }
            }
            if (id===undefined||id==='all'){
                redis.keys(options.prefix+':*',function(err,result){
                    if (!err){
                        rt=result.length;
                        if (result.length!==0){
                            for (var i=0;i<result.length;i++){
                                getRecord(result[i],onGetRecord);
                            }
                        }else{
                            callback(200,[]);
                        }
                    }else{
                        callback(500,err);
                    }
                });
            }else{
                getRecord('user:'+id,function(err,result){
                    if (!err){
                        callback(null,[result]);
                    }else{
                        callback(500,{
                            success: false,
                            msg:'cannot obtain record'
                        });
                    }
                });
            }
        };
        this.POST = function(callback){
            function createRecord(id){
                var userObj = {};
                for(var i=0;i<options.fieldList.length;i++){
                    userObj[options.fieldList[i]] = data.body[options.fieldList[i]];
                }
                redis.hmset(options.prefix+':'+id,redis.obj2str(userObj));
            }
            if (id===undefined){
                console.log(data.req.files);
                //  creane new one
                redis.incr('next.'+options.prefix+'.id',function(err,result){
                    if (!err){
                        createRecord(result);
                    }else{
                        console.log(err);
                    }
                });
                callback(201,{
                    success: true
                });
            }else{
                callback(400,'Unexpected parameter `id`');
                //   Extjs method for update // stub
                //_this.PUT(callback);
            }
        };
        this.PUT = function(callback){
            if (id===undefined){
                callback(400,'No enought params');
            }else{
                var b = data.body;
                var obj = {};
                for (var k in b){
                    obj[k]=b[k].toString();
                }
                //  id is not need to be placed in record, so delete it from object
                delete obj.id;
                redis.hmset(options.prefix+':'+id,obj,function(err,result){
                    if (!err){
                        callback(200,{
                            success: true
                        });
                    }else{
                        callback(500,{
                            success: false
                        });
                    }
                });
            }
        };
        this.DELETE = function(callback){
            var key = options.prefix+':'+id;
            redis.del(key,function(err,result){
                if (!err){
                    callback(200,{
                        success: true
                    });
                }else{
                    callback(500,{
                        success:false
                    });
                }
            });
        };
    };
    
    module.exports.userctrl = function(data){
        return new dbctrl(data,{
            prefix: 'user',
            fieldList: ['name','email','phone','deleted']
        });
    };
    
    module.exports.paloserversctrl = function(data){
        return new dbctrl(data,{
            prefix: 'palo.server',
            fieldList: ['name','ipaddress','port','login','password']
        });
    };
    
    module.exports.palodatabasesctrl = function(data,options){
        var palodbctrl = function(){
            
            this.GET = function(callback){
                palo.getClient(data.session,function(err,client){
                    if (!err){
                        client.call('server','databases',data.req,function(err,result){
                            if(!err){
                                callback(200,result.result);
                            }else{
                                callback(err,result);
                            }
                        });
                    }else{
                        callback(err,null);
                    }
                });
            };
            
        };
        return new palodbctrl();
    };
})();

