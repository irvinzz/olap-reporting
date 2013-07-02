var Ext = Ext || {};

Ext.define('Olap.view.palo.servers.Toolbar',{
    extend: 'Ext.toolbar.Toolbar',
    items:[
        {
            xtype:'button',
            text: 'Добавить',
            handler: function(){
                Ext.ComponentManager.get('Navigator').fireEvent('Olap.view.Navigator.Navigate',['Olap.view.palo.servers.Edit']);
            }
        },
        {
            xtype: 'button',
            text: 'Редактировать',
        },
        '-',
        {
            xtype: 'button',
            text: 'Удалить',
        }
    ],
    initComponent: function(){
        this.callParent();
        this.addEvents('Olap.view.User.List.Update');
    }
});