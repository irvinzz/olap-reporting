var CommonData = require('./CommonData.js');
var UserCtrl = new CommonData({
    prefix: 'user',
    fields: ['name','email','phone','deleted']
});
module.exports = UserCtrl;