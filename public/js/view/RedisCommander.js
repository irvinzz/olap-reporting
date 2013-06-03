var Ext = Ext || {};

Ext.define('Olap.view.RedisCommander',{
    extend: 'Ext.panel.Panel',
    title: 'RedisCommander',
    singleInstance: true,
    icon: '/img/rediscommander.png',
    html: '<iframe src="http://localhost:8081/" style="width:100%; height: 100%">',
    initComponent: function(){
        var loc = window.location.hostname+':8081';
        this.html = '<iframe src="http://'+loc+'" style="width:100%; height: 100%">';
        this.callParent();
    }
});