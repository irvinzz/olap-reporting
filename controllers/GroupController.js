var CommonData = require('./CommonData.js');
var UserCtrl = new CommonData({
    prefix: 'group',
    fields: ['name','description','deleted']
});
module.exports = UserCtrl;