var Ext = Ext || {};

var md5 = md5 || function() { Ext.Msg.alert('no md5 presented'); };

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        'Olap': '/js',
        'Ext.ux': '/js/ext/ux'
    }
});

Ext.Ajax.disableCaching = false;

Ext.application({
    name: 'olapapp',
    controllers: [
        'Olap.controller.Admin',
        'Olap.controller.Navigator',
        'Olap.controller.Hash',
        'Olap.controller.Socket_io',
        'Olap.controller.History',
        'Olap.controller.SourceManager'
    ],
    launch: function() {
        window.viewport = Ext.create('Olap.view.Viewport');
        Ext.History.add('/');
    }
});
