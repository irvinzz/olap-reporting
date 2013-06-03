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
    extend: 'Ext.panel.Panel',
    title: 'Редактор шаблонов',
    layout: 'fit',
    icon: '/img/icons/script_edit.png',
    items: [
        {
            xtype: 'panel',
            layout: 'border',
            items: [
                Ext.create('Olap.view.templates.Toolbar',{
                    region: 'north'
                }),
                {
                    xtype: 'htmleditor',
                    region: 'center',
                    flex: 2
                }
            ]
        }
    ]
});