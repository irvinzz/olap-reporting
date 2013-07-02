var Ext = Ext || {};

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
        'Olap': '/js'
    }
});

Ext.require([
    'Olap.view.MainFrame',
    'Olap.view.Navigator',
    'Olap.view.admin.Toolbar',
    'Olap.view.admin.MainWindow',
]);

Ext.application({
    name: 'Olap.app.Admin',
    controllers: ['Olap.controller.Admin','Olap.controller.Navigator','Olap.controller.Hash','Olap.controller.Socket_io'],
   // controllers: ['Olap.controller.Hash'],
    //views: ['MainWindow'],
    launch: function() {
        Ext.create('Olap.view.admin.MainWindow');
        console.log('application started');
    }
});

