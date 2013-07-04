var Ext = Ext || {};

Ext.data.Types.array = {
    convert: function(v, data) {
        console.log('<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>');
        var r='';
        for (var i=0;i<data.length;++i){
            r.push(data[i].toString());
        }
        return r;
    },
    sortType: function(v) {
        return v.length;
    },
    type: 'array'
};

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

