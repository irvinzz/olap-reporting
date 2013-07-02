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
        req.logout();
        palo.purgeClient(req.session.paloKey);
        delete req.session.paloKey;
        res.json({
            success: true
        });
    }
};