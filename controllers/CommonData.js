var redis = require('../controllers/database.js')();
var f = require('../controllers/CommonDataInner.js');

module.exports = function(opts){
    opts.defaults = opts.defaults || {};
    var o = {
        prefix: opts.prefix,
        
        fields: opts.fields,
        hiddenFields: opts.hiddenFields
    };
    // COMMON REST
    var r = {
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
        post_id: function(req,res,id){
            r.post_index(req,res);
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
                    record.id=id;
                    f.out(res,err,{
                        success: true,
                        total: 1,
                        rows: [record]
                    });
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
    return r;
};



















