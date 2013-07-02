var Ext = Ext || {};

Ext.define('Olap.view.templates.Toolbar',{
    extend: 'Ext.toolbar.Toolbar',
    items: [
        {
            xtype: 'button',
            text: 'Сохранить',
            icon: '/img/icons/script_save.png'
        }
    ]
});

Ext.define('Olap.view.templates.Edit',{
    extend: 'Ext.container.Container',
    title: 'Редактор шаблонов',
    layout: 'vbox',
    icon: '/img/icons/script_edit.png',
    defaults: {
        width: '100%'
    },
    items: [
        Ext.create('Olap.view.templates.Toolbar',{
        }),
        {
            xtype: 'htmleditor',
            flex: 2
        }
    ]
});