var nconf;
module.exports = function(){
    if (nconf===undefined){
        nconf = require('nconf');
        nconf.env().file({file: 'config.json'});
    }
    return nconf;
};