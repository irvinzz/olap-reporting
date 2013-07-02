var Ext = Ext || {};

Ext.define('Olap.view.RedisCommander',{
    extend: 'Ext.container.Container',
    title: 'RedisCommander',
    singleInstance: true,
    icon: '/img/rediscommander.png',
    initComponent: function(){
        var loc = window.location.hostname+':8081';
        this.html = '<iframe src="http://'+loc+'" style="width:100%; height: 100%">';
        this.callParent();
    }
});