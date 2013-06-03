var passport = require('../init/passport')();
module.exports = {
    get_index: function(req,res){
        res.send('ok');
    },
    post_local: [passport.authenticate('local'), function(req,res){
        res.send('ok');
    }]
}