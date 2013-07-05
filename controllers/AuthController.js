var passport = require('passport');
var palo = require('./libs');
module.exports = {
    get_index: function(req,res){
        var result = req.isAuthenticated() ? 200 : 401;
        res.json(result,{
            success: true,
            data: req.session
        });
    },
    post_local: [passport.authenticate('local'), function(req,res){
        res.json({
            success: true,
            user: req.user
        });
    }],
    delete_index: function(req,res){
        palo.purgeClient(req.session.passport.paloKey);
        req.logout();
        res.json({
            success: true
        });
    }
};