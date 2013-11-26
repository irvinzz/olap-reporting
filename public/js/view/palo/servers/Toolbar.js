var Ext = Ext || {};

Ext.define('Olap.view.palo.servers.Toolbar',{
    extend: 'Ext.toolbar.Toolbar',
    items:[
        {
            xtype:'button',
            text: 'Добавить',
            id: 'addButton'
        }
    ],
    initComponent: function(){
        this.callParent();
        this.addEvents('Olap.view.User.List.Update');
    }
});