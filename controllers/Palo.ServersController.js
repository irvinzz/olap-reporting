var CommonData = require('./CommonData.js');
var PaloServersCtrl = new CommonData({
    prefix: 'PaloServers',
    fields: ['name','host','port','user','extern_password']
});
module.exports = PaloServersCtrl;
