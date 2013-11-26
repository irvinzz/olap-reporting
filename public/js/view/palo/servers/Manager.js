var Ext = Ext || {};

Ext.define('Olap.view.palo.servers.Manager',{
    id: 'OlapViewPaloServersManager',
    extend: 'Ext.container.Container',
    title: 'Панель управления Palo Серверами',
    singleInstance: true,
    layout: 'vbox',
    defaults:{
        width: '100%'
    },
    items:[
        Ext.create('Olap.view.palo.servers.Toolbar',{
            id: 'Toolbar',            
            listeners:{
                'Olap.view.User.List.Update': function(){
                    this.up().child('OlapViewUserList').store.load();
                    //this.up().up().userList.store.load();
                }
            }
        }),
        Ext.create('Olap.view.palo.servers.List',{flex: 2, id: 'List'})//,
        /*{
            html: 'sometext',
            xtype: 'container'
        }*/
    ],
});