var redis = require('../controllers/database.js')();
var directions = ['ASC','DESC'];
var f = {
    getall: function(opts,c){

        var me = this;
        var prefix=opts.prefix;
        redis.keys(prefix+":*",function(err,result){
            var l = result.length;
            var i = 0;
            var res=[];
            for (var j=0;j<l;j++){
                opts.key = result[j];
                me.getbyid(opts,onGet);
            }
            function afterGet(){
                if (i>=l){
                    c(null,res);
                }
            }
            afterGet();
            function onGet(err,result){
                i++;
                if (!err){
                    if (!!result){
                        res.push(result);
                    }
                }
                afterGet();
            }
        });
    },
    getbyid: function(opts, c) {
        var id = opts.id || (opts.key.split(':')[1]) || undefined;
        var key = opts.key || (opts.prefix + ':' + opts.id) || undefined;
        if (key === undefined || id === undefined) return c('key || id not specified', null);
        redis.hgetall(opts.key || (opts.prefix + ':' + opts.id), function(err, result) {
            result.id = id;
            c(err, result);
        });
        
        /*function(err,result){
            if (!err){
                if (!!result){
                    c(null,result);
                }else{
                    c(null,null);
                }
            }else{
                c(err,null);
            }
            c(err,result);
        }*/
    },
    delete: function(opts,c){
        mapper[opts.entry].deleteById(opts.id,c);
    },
    cleanup: function(obj,defaults){
        //  Setting up defaults values
        for (var j in defaults){
            var x = obj[j];
            if ((x===0) || (x==='')){
                obj[j]=defaults[j];
            }
        }
        return obj;
    },
    out: function(res,err,result){
        if (!err){
            res.json({
                success: true,
                total: result.total || 0,
                rows: result.rows
            });
        }else{
            res.json({
                success: false,
                result: err
            });
        }
    }    
};

module.exports = function(opts){
    opts.defaults = opts.defaults || {};
    var o = {
        prefix: opts.prefix,
        fields: opts.fields,
        hiddenFields: opts.hiddenFields
    };
    // COMMON REST
    return {
        get_index: function(req,res){
            o.limit = req.query.limit || 25;
            o.page = req.query.page || 1;
            o.start = req.query.start || 0;
            o.sort = req.query.sort || undefined;
            f.getall(o,function(err,results){
                f.out(res,err,{
                    total: results.length,
                    rows: results
                });
            });
        },
        get_index_id: function(req,res,id){
            o.id = id;
            f.getbyid(o,function(err,result){
                var r;
                if (!result){
                    r=[];
                }else{
                    r = [result];
                }
                f.out(res,err,{
                    total: r.length || 0,
                    rows: r
                });
            });
        },
        post_index: function(req,res){
            var obj = {};
            for (var i in req.body){
                obj[i]=req.body[i];
            }
            obj = f.cleanup(obj,opts.defaults);
            //  Looks like ready to insert
            redis.incr('next.'+opts.prefix+'.id',function(err,result){
                if (!err){
                    createRecord(result);
                }else{
                    console.log(err);
                }
            });
            function createRecord(id){
                var record = {};
                for(var i=0;i<opts.fields.length;i++){
                    record[opts.fields[i]] = req.body[opts.fields[i]];
                }
                redis.hmset(opts.prefix+':'+id,redis.obj2str(record),function(err,result){
                    f.out(res,err,result);
                });
            }
                
            /*
                
             mapper[opts.entry].create(obj, function(err, result) {
                obj.id = result.insertId;
                f.out(res,err,obj);
            });*/
        },
        put_index: function(req,res,id){
            var b = req.body;
            var obj = {};
            for (var k in b){
                obj[k]=b[k].toString();
            }
            //  id is not need to be placed in record, so delete it from object
            delete obj.id;
            redis.hmset(opts.prefix+':'+id,obj,function(err,result){
                f.out(res,err,result);
            });
        },
        delete_index_id: function(req,res,id){
            o.id=id;
            f.delete(o,function(err,result){
                f.out(res,err,result);
            });
        }
    };
};



















