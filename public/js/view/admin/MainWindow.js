var Ext = Ext || {};

Ext.require([
    'Olap.view.Navigator',
    'Olap.view.admin.Toolbar',
    'Olap.view.MainFrame'
]);

Ext.define('Olap.view.admin.MainWindow', {
    extend: 'Ext.container.Container',
    layout: 'border',
    items: [{
        xtype: 'panel',
        region: 'north',
        items: [
        Ext.create('Olap.view.admin.Toolbar')]
    },
    Ext.create('Olap.view.Navigator', {
        region: 'west',
        collapsible: true,
        split: true,
        minWidth: 200,
        maxWidth: 500,
        width: '15%'
    }), {
        xtype: 'container',
        layout: 'fit',
        region: 'center',
        items: Ext.create('Olap.view.MainFrame', {
            layout: 'vbox'
        })
    }, {
        xtype: 'panel',
        region: 'south',
        html: 'i am south'
    }]
});
