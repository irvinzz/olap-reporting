var mongo = require('../controllers/mongo');
var mongorest = require('../controllers/mongorest');

var rest = mongorest({
    object: 'Bind',
    schema: mongo.schemas.Bind,
    filter: ['report']
});

module.exports = rest;

/*rest.get_id_binds = function(req,res,id){
    mongo.models.Bind.find({
        report: id
    },function(err,binds){
        if (!!err) return res.json({
            success: false,
            msg: err
        });
        res.json({
            success: true,
            total: binds.length,
            rows: binds
        });
    });
};
rest.post_id_binds = function(req,res,id){
    b.find({
        report: id
    },function(err,binds){
        var nb = new b({
            variable: req.body.variable,
            link: req.body.link,
            report: id
        });
        nb.save(function(err,report){
            if (!!err) return res.json({
                success: false,
                msg: err
            });
            res.json({
                success: true
            });
        });
    });
};

rest.put_id_binds_bid = function(req,res,id,bid){
    b.findById(bid,function(err,bind){
        bind.variable = req.body.variable;
        bind.link = req.body.link;
        bind.save(function(err,doc){
            res.json({
                success: !err,
                msg: err
            });
        });
    });
};*/