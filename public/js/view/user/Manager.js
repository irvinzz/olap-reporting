var Ext = Ext || {};

Ext.require([
    'Olap.view.user.Toolbar',
    'Olap.view.user.List',
    'Olap.view.user.Edit'
]);

Ext.define('Olap.view.user.Manager',{
    extend: 'Olap.view.common.Manager',
    title: 'Панель управления пользователями',
    icon: '/img/icons/users.png',
    
    singleInstance: true,
    initComponent: function(){
        this.callParent();
    },
    items: [
        Ext.create('Olap.view.user.Toolbar',{
            listeners:{
                'Olap.view.User.List.Update': function(){
                    this.up().child('OlapViewUserList').store.load();
                }
            }
        }),
        Ext.create('Olap.view.user.List',{
            flex: 2
        })
    ]
});