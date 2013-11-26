var Ext = Ext || {};

Ext.define('Olap.view.relational.Manager',{
    extend: 'Ext.container.Container',
    title: 'Выгрузки из Реляционных БД',
    singleInstance: true,
    layout: 'vbox',
    defaults:{
        width: '100%'
    },
    items:[
        {
            html: 'ok'
        }
//        Ext.create('')
    ]
});