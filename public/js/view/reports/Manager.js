var Ext = Ext || {};

Ext.require(['Olap.store.Templates', 'Olap.store.Reports', ]);

Ext.define('Olap.view.reports.Manager', {
    itemId: 'OlapViewReportsManager',
    extend: 'Ext.container.Container',
    title: 'Менеджер отчетов',
    icon: '/img/icons/report.png',
    layout: 'vbox',
    height: '100%',
    defaults: {
        width: '100%'
    },
    items: [{
        xtype: 'toolbar',
        itemId: 'Toolbar',
        items: [{
            xtype: 'label',
            text: 'Выберите отчет'
        }, {
            xtype: 'combo',
            store: Ext.data.StoreManager.lookup('OlapStoreReports'),
            displayField: 'name',
            valueField: '_id',
            itemId: 'ReportsBox',
            width: 250
        }, {
            xtype: 'button',
            icon: '/img/icons/report_add.png',
            text: 'Сохранить',
            itemId: 'saveReportBtn'
        }, {
            xtype: 'label',
            text: 'Предпросмотр'
        }, {
            xtype: 'button',
            itemId: 'previewBtn',
            icon: '/img/icons/report_magnify.png'
        }, {
            xtype: 'button',
            itemId: 'previewPDFBtn',
            icon: '/img/pdf-3.png',
            scale: 'small'
        }, ]
    }, {
        xtype: 'toolbar',
        items: [{
            xtype: 'label',
            text: 'Выберите шаблон'
        }, {
            xtype: 'combo',
            store: Ext.data.StoreManager.lookup('OlapStoreTemplates'),
            displayField: 'name',
            valueField: '_id',
            itemId: 'TemplatesBox'
        }, {
            xtype: 'button',
            text: 'Добавить значение переменной',
            itemId: 'addBind',
            icon: '/img/icons/brick_add.png'
        }]
    },
    Ext.create('Olap.view.reports.Binds', {
        width: '100%',
        icon: '/img/icons/brick_link.png',
        itemId: 'BindsTable',
        flex: 2
    })]
});