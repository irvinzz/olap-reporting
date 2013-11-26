var Ext = Ext || {};

Ext.require(['Olap.store.Coordinates','Olap.store.Templates','Olap.store.Variables']);

Ext.define('Olap.view.templates.Toolbar',{
    extend: 'Ext.toolbar.Toolbar',
    items: [
        {
            xtype: 'label',
            text: 'Выберите шаблон'
        },
        {
            xtype: 'combobox',
            store: Ext.data.StoreManager.lookup('OlapStoreTemplates'),
            displayField: 'name',
            valueField: '_id',
            itemId: 'TemplatesBox'
        },
        /*{
            text: 'Обновить шаблон',
            itemId: 'saveTemplateBtn'
        },*/
        {
            text: 'Сохранить',
            itemId: 'saveTemplateAsNewBtn',
            icon: '/img/icons/script_save.png'
        },
        {
            text: 'Удалить шаблон',
            itemId: 'deleteTemplateBtn',
            icon: '/img/icons/script_delete.png'
        },
        /*{
            text: 'Предпросмотр',
            itemId: 'previewBtn',
            icon: '/img/icons/script_go.png'
        },
        {
            itemId: 'CoordinatesBox',
            xtype: 'combobox',
            store: Ext.data.StoreManager.lookup('OlapStoreCoordinates'),
            displayField: 'name',
            valueField: 'id',
        },*/
        {
            xtype: 'textfield',
            itemId: 'VariableField'
        },
        {
            text: 'Вставить переменную',
            itemId: 'insertVariable',
            icon: '/img/icons/brick_add.png'
        }/*,
        {
            xtype: 'button',
            text: 'getalltext',
            handler: function(){
                window.e__ = this.up('container').up('container').child('#jadeeditor').editor;
                console.log(this.up('container').up('container').child('#jadeeditor').getValue());
            }
        }*/
    ]
});

Ext.create('Olap.store.Variables',{
    storeId: 'OlapStoreVariables',
});

Ext.define('Olap.view.templates.Manager',{
    itemId: 'OlapViewTemplatesManager',
    extend: 'Ext.container.Container',
    title: 'Редактор шаблонов',
    layout: 'border',
    //height: '100%',
    icon: '/img/icons/script_edit.png',
    defaults: {
//        width: '100%',
        split: true
    },
    items: [
        Ext.create('Olap.view.templates.Toolbar',{
            itemId: 'Toolbar',
            region: 'north'
        }),
        Ext.create('Olap.view.jade-editor',{
            itemId: 'jadeeditor',
            region: 'center',
            layout: 'fit',            
            flex: 2
        }),
        Ext.create('Olap.view.templates.Variables',{
            itemId: 'VariablesTable',
            region: 'east',
            flex: 2,
        })
/*,
        Ext.create('Olap.view.templates.Binds',{
            icon: '/img/icons/brick.png',
            itemId: 'Binds',
            region: 'east',
            flex: 2,
            objectId: 0
        })*/
    ]
});


































