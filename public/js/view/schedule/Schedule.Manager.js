var Ext = Ext || {};

Ext.define('Olap.view.Schedule.Manager',{
    extend: 'Ext.panel.Panel',
    title: 'Менеджер рассылок',
    icon: '/img/icons/email.png',
    singeleInstance: true,
    items: [
        Ext.create('Olap.view.Schedule.List',{})
    ]
});