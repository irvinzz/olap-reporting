var Ext = Ext || {};

Ext.define('Olap.controller.PaloServerManagerController',{
    extend: 'Ext.app.Controller',
    init: function(){
        console.log('target started');
        var me = this;
        this.control({
            '#OlapViewPaloServersManager #Toolbar #addButton': {
                click: function(){
                    var store = me.getOlapViewPaloServersList().store;
                    store.add({});
                    console.log('button clicked');
                }
            }
        });
    },
    refs:[{
        ref: 'OlapViewPaloServersToolbar',
        selector: '#OlapViewPaloServersManager #Toolbar'
    },{
        ref: 'OlapViewPaloServersManager',
        selector: '#OlapViewPaloServersManager'
    },{
        ref: 'OlapViewPaloServersList',
        selector: '#OlapViewPaloServersManager #List'
    }]
});
