var directions = ['ASC','DESC'];
var redis = require('../controllers/database.js')();
var async = require('async');

module.exports = {
    getall: function(opts,c){

        var me = this;
        var prefix=opts.prefix;
        redis.keys(prefix+":*",function(err,result){
            async.map(result,function(key,cb){
                me.getbyid({key: key},cb);
            },function(err,results){
                c(err,results);
            });
            /*
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
            }*/
        });
    },
    getbyid: function(opts, c) {
        var id = opts.id || (opts.key !== undefined ? opts.key.split(':')[1] : undefined);
        var key = opts.key || (opts.prefix + ':' + opts.id) || undefined;
        if (key === undefined || (id === undefined && opts.prefix === undefined)) return c('key || id+key not specified', null);
        redis.hgetall(opts.key || (opts.prefix + ':' + opts.id), function(err, result) {
            if (err) return c(err,null);
            if (null===result) return c('no data found by id `'+opts.id+'\'',null);
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
        if (opts.prefix===undefined) return c('prefix is not defined',null);
        var id = opts.id || (opts.key.split(':')[1]) || undefined;
        var key = opts.key || (opts.prefix + ':' + opts.id) || undefined;
        if (key === undefined || id === undefined) return c('key || id not specified', null);
        redis.del(opts.key || (opts.prefix + ':' + opts.id),function(err,result){
            if (err) return c(err,null);
            c(err,result);
        });
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
        console.log(result);
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