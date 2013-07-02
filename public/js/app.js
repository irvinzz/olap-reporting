var Ext = Ext || {};
var md5 = md5 || function() { Ext.Msg.alert('no md5 presented'); };
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
        'Olap': '/js'
    }
});

Ext.define('Olap.view.Viewport',{
    extend: 'Ext.container.Viewport',
    itemId: 'viewport',
    layout: 'fit',
});

Ext.application({
    name: 'olapapp',
    controllers: ['Olap.controller.Admin','Olap.controller.Navigator','Olap.controller.Hash','Olap.controller.Socket_io','Olap.controller.History'],
    launch: function() {
        var vp = Ext.create('Olap.view.Viewport');
        window.viewport = vp;
        //Ext.History.fireEvent('change');
        Ext.History.add('/');
        
        /*Ext.create('Olap.view.Login', {
            renderTo: Ext.getBody(),
            closable: false
        }).show();*/
    }
});







