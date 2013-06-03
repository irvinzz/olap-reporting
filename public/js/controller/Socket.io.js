var Ext = Ext || {};
var io = io || {};
Ext.define('Olap.controller.Socket_io', {
    extend: 'Ext.app.Controller',
    init: function(){
        window.socketio = io.connect(window.location.protocol+'//'+window.location.host);
        window.socketio.on('news', function (data) {
            console.log(data);
            //window.socketio.emit('my other event', { my: 'data' });
        });
    }
});
