var Ext = Ext || {};

Ext.define('Olap.view.Palo.Databases.Manager.Toolbar',{
    extend: 'Ext.toolbar.Toolbar',
    items:[
        {
            xtype:'button',
            text: 'Обновить',
            handler: function(){
                Ext.ComponentManager.get('Navigator').fireEvent('Olap.view.Palo.Databases.List.Update');
            }
        }
    ],
    initComponent: function(){
        this.callParent();
        this.addEvents('Olap.view.');
    }
});