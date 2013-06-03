var Ext = Ext || {};

Ext.define('Olap.view.palo.servers.Manager',{
    extend: 'Ext.panel.Panel',
    title: 'Панель управления Palo Серверами',
    singleInstance: true,
    items:[
        Ext.create('Olap.view.palo.servers.Toolbar',{
            listeners:{
                'Call': function(options){
                    
                },
                'Olap.view.User.List.Update': function(){
                    this.up().child('OlapViewUserList').store.load();
                    //this.up().up().userList.store.load();
                }
            }
        }),
        Ext.create('Olap.view.palo.servers.List',{flex: 2})
    ],
});