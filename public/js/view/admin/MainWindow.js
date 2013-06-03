var Ext = Ext || {};

/*
Ext.define('Olap.view.MainViewPort',{
    extend: 'Ext.container'
});*/

Ext.define('Olap.view.admin.MainWindow',{
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    items:[
        {
            xtype: 'panel',
            layout: 'border',
            items:[
                {
                    xtype: 'panel',
                    region: 'north',
                    items:[
                        Ext.create('Olap.view.admin.Toolbar')
                    ]
                },
                Ext.create('Olap.view.Navigator',{
                    region: 'west',
                    collapsible: true,
                    split: true,
                    minWidth: 200,
                    maxWidth: 500,
                    width: '15%'
                }),
                Ext.create('Olap.view.MainFrame',{
                    region: 'center'
                }),
                {
                    xtype: 'panel',
                    region: 'south',
                    html: 'i am south'
                }
            ]
        }
    ]
});



