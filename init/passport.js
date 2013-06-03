function passport_init(){
    var passport = require('passport');
    var paloClient = require('../controllers/libs.js').getGlobalClient();
    passport.serializeUser(function(user,done){
        done(null,user);
    });
    passport.deserializeUser(function(id,done){
        done(null,{});
    });
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy({ usernameField: 'user', passwordField: 'password'},function(username,password,done){
/*        console.log('user: '+username);
        console.log('pwd:  '+password);
        paloClient.call('server','login',{
            query:{
                user: username,
                extern_password: password
            }},function(err,result){
                if (!err){
                    done(null,result);
                }else{
                    done(err,null);
                }
            }
        );*/
        return done(null,{
            user: 'aaxas',
            someinfo: 'asdas'
        });
    }));
    return passport;
}
(function(){    
    var instance;
    module.exports = function(){
        if (instance===undefined){
            instance = passport_init();
        }
        return instance;
    };
})();