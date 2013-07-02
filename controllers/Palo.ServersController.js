var CommonData = require('./CommonData.js');
var PaloServersCtrl = new CommonData({
    prefix: 'PaloServers',
    fields: ['name','ipaddress','port','login','password']
});
module.exports = PaloServersCtrl;
