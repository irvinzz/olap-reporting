var Ext = Ext || {};

Ext.require([
    'Olap.store.Coordinates'
]);
Ext.create('Olap.store.Binds',{
    storeId: 'OlapStoreReportsBinds',
});

Ext.define('Olap.view.reports.Binds',{
    extend: 'Olap.view.common.List',
    title: 'Таблица привязок',
    store: Ext.data.StoreManager.lookup('OlapStoreReportsBinds'),
    listeners: {
        
    },
    initComponent: function(){
        var me = this;
        me.variablesEditor = Ext.create('Ext.form.field.ComboBox',{
            store: Ext.create('Olap.store.Variables'),
            displayField: 'name',
            valueField: '_id'
        });
        this.columns = [{
            text: 'id',
            dataIndex: '_id',
            flex:1
        },{
            text: 'Переменная',
            dataIndex: 'variable',
            editor: me.variablesEditor,
            flex:1,
            renderer: function(value){
                var store = me.variablesEditor.store;
                var val = store.getById(value);
                if (val === null) return '';
                return val.get('name');
            }
        },{
            text: 'Данные',
            dataIndex: 'link',
            editor: {
                xtype: 'combobox',
                store: Ext.data.StoreManager.lookup('OlapStoreCoordinates'),
                displayField: 'name',
                valueField: 'id',
            },
            editable: false,
            flex:3,
            renderer: function(value){
                var store = Ext.data.StoreManager.lookup('OlapStoreCoordinates');
                var val = store.getById(value);
                return val.get('name');
            }
        }];
    
        this.callParent();
    }
});








































