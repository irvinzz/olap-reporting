var redis = require("redis");
var config = require("../controllers/config");
var dbclient;
exports.getInstance = function() {
        if (!dbclient){
            dbclient = redis.createClient(config.db.port, config.db.host);
            dbclient.on("connect",function(){
                console.log("RedisClient connected;");
            });
        }
        return dbclient;
};