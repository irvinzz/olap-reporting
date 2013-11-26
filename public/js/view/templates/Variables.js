var Ext = Ext || {};

Ext.define('Olap.view.templates.Variables', {
    extend: 'Olap.view.common.List',
    store: Ext.data.StoreManager.lookup('OlapStoreVariables'),
    columns: [{
        text: 'Идентификатор',
        dataIndex: '_id',
        flex: 1
    }, {
        text: 'Имя',
        dataIndex: 'name',
        flex: 3,
        editor: 'textfield'
    }, {
        text: 'Тип',
        dataIndex: 'type',
        flex: 3,
        editor: {
            xtype: 'combobox',
            store: {
                fields: ['abbr', 'name'],
                data: [{
                    "abbr": "value",
                    "name": "1 Значение"
                }, {
                    "abbr": "table",
                    "name": "Таблица"
                }, {
                    "abbr": "chart",
                    "name": "График"
                }]
            },
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr',
            editable: false
        }
    }, {
        text: 'Подсказка',
        dataIndex: 'hint',
        flex: 4,
        editor: 'textfield'
    }],

    initComponent: function(){
        this.callParent();
        this.addEvents('deleting');
    },
    itemcontextmenu: [{
        text: 'Удалить',
        icon: '/img/icons/brick_delete.png',
        itemId: 'deleteMenuItem'
    }]
});





















