function passport_init(){
    var passport = require('passport');
    var paloClient;
    require('../controllers/libs.js').getGlobalClient({},function(err,result){
        if (!err){
            paloClient = result;
        }else{
            throw err+' with '+JSON.stringify(result);
        }
    });
    passport.serializeUser(function(user,done){
        done(null,user);
    });
    passport.deserializeUser(function(id,done){
        done(null,id);
    });
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy({ usernameField: 'user', passwordField: 'password'},function(username,password,done){
        paloClient.call('server','login',{
                query:{
                    user: username,
                    password: password
                }
            },function(err,result){
                if (!err){
                    var user = {
                        user: username,
                        sid: result.rows[0].sid,
                        ttl: result.rows[0].ttl
                    };
                    done(null,user);
                }else{
                    done(err,result);
                }
            }
        );
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