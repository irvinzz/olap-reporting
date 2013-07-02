var Ext = Ext || {};

Ext.define('Olap.view.user.Toolbar',{
    extend: 'Ext.toolbar.Toolbar',
    items:[
        {
            xtype:'button',
            text: 'Добавить',
            icon: '/img/icons/user_add.png',
            handler: function(){
                Ext.ComponentManager.get('Navigator').fireEvent('Olap.view.Navigator.Navigate',['Olap.view.user.Edit']);
            }
        },
        {
            xtype: 'button',
            text: 'Редактировать',
            icon: '/img/icons/user_edit.png'
        },
        '-',
        {
            xtype: 'button',
            text: 'Удалить',
            icon: '/img/icons/user_delete.png'
        }
    ],
    initComponent: function(){
        this.callParent();
        this.addEvents('Olap.view.User.List.Update');
    }
});