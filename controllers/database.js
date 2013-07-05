(function(){
    var redis = require("redis");
    //var config = require("../controllers/config");
    var dbclient;
    var nconf = require('../init/nconf')();
    module.exports = function() {
        if (!dbclient){
            dbclient = redis.createClient(nconf.get('redis:port'), nconf.get('redis.host'));
            dbclient.select(nconf.get('redis:db'));
            dbclient.on("connect",function(){
                console.log("RedisClient connected;");
            });
            dbclient.obj2str = function(obj){
                //  converting every object field to string
                for (var k in obj){
                    var v = obj[k];
                    switch (typeof(v)){
                        case 'undefined':
                            delete obj[k];
                        break;
                        case 'number':
                        case 'boolean':
                            obj[k]=obj[k].toString();
                        break;
                        case 'object':
                            obj[k]=JSON.stringify(obj[k]);
                        break;
                        case 'string':
                            //  do nothing
                        break;
                        default: 
                            throw {
                                error: true,
                                text: ''
                            };
                    }
                }
                return obj;
            };
        }
        return dbclient;
    };
})();

