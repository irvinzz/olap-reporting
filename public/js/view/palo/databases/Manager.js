var Ext = Ext || {};

Ext.define('Olap.view.Palo.Databases.Manager',{
    extend: 'Ext.panel.Panel',
    title: 'Панель управления Базами Данных Palo',
    singleInstance: true,
    items:[
        Ext.create('Olap.view.Palo.Databases.Manager.Toolbar',{
            listeners:{
                'Call': function(options){
                    
                },
                'Olap.view.User.List.Update': function(){
                    this.up().child('OlapViewUserList').store.load();
                    //this.up().up().userList.store.load();
                }
            }
        }),
        Ext.create('Olap.view.Palo.Databases.List',{flex: 2})
    ],
});