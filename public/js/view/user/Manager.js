var Ext = Ext || {};

Ext.define('Olap.view.user.Manager',{
    extend: 'Ext.panel.Panel',
    title: 'Панель управления пользователями',
    icon: '/img/icons/users.png',
    singleInstance: true,
    items:[
        Ext.create('Olap.view.user.Toolbar',{
            listeners:{
                'Call': function(options){
                    
                },
                'Olap.view.User.List.Update': function(){
                    this.up().child('OlapViewUserList').store.load();
                    //this.up().up().userList.store.load();
                }
            }
        }),
        Ext.create('Olap.view.user.List',{flex: 2})
    ],
});