var mongo = require('../controllers/mongo');
module.exports = function(opts) {
    var object = opts.object;
    var e = mongo.models[object];
    if (!e){    //  If no schema presented
        e = mongo.models[object] = mongo.mongoose.model(opts.object,opts.schema);
    }
    var fields = mongo.fields[object];
    return {
        get_purge: function(req,res){
            e.remove({},function(err){
                res.send({
                    success: !!err,
                    msg: err
                });
            });
        },
        get_drop: function(req,res){
            e.sessions.drop();
            res.send('ok?');
        },
        get_index: function(req, res) {
            var filter = opts.filter || [];
            var fo = {};
            for (var i=0;i<filter.length;i++){
                fo[filter[i]] = req.query[filter[i]];
            }
            e.find(fo,function(err,docs){
                if (!!err) return res.json({
                    success: false,
                    msg: err
                });
                res.json({
                    success: true,
                    total: docs.length,
                    rows: docs
                });
            });
        },
        get_id: function(req,res,id){
            e.find({
                _id: id
            },function(err,docs){
                if (!!err) return res.json({
                    success: false,
                    msg: err
                });
                res.json({
                    success: true,
                    total: docs.length,
                    rows: docs
                });
            });
        },
        post_index: function(req,res){
            var i = new e();
            for (var f in fields){
                i[fields[f]] = req.body[fields[f]] || i[fields[f]];
            }
            console.log(i._id);
            //i._id = require('mongodb').BSONPure.ObjectID();
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
        },
        put_id: function(req,res,id){
            e.find({
                _id: id
            },function(err,docs){
                 if (!err){
                    if (docs.length>0){
                        var r = docs[0];
                        for (var i in fields){
                            var _f = fields[i];
                            r[_f] = req.body[_f] || r[_f];
                        }
                        r.save(function(err,rec){
                            if (err){
                                res.json({
                                    success: false,
                                    msg: err
                                });
                            }else{
                                res.json({
                                    success: true,
                                    total: rec.length,
                                    rows: [rec]
                                });
                            }
                        });
                    }else{
                        res.json({
                            success: false,
                            msg: 'no objects found'
                        });
                    }
                }else{
                    res.json({
                        success: false,
                        msg: err
                    });
                }
            });
        },
        delete_id: function(req,res,id){
            //findAndRemove
            e.find({
                _id: id
            },function(err,docs){
                if (!!err){
                   return res.json({
                       success: false,
                       total: 0,
                       msg: err
                   });
                }
                if (docs.length===0){
                    return res.json({
                        success: false,
                        total: 0,
                        msg: 'no docs found'
                    });
                }
                docs[0].remove(function(err){
                    if (err){
                        res.json({
                            success: false,
                            msg: err
                        });
                    }else{
                        res.json({
                            success: true
                        });
                    }
                });
            });
        }
    };
};