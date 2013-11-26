var Ext = Ext || {};

Ext.require([
    'Olap.model.Template'
]);

Ext.define('Olap.store.Templates', {
    extend: 'Ext.data.Store',
    model: 'Olap.model.Template',
    proxy: {
        type: 'rest',
        url: '/api/templates',
        reader: {
            type: 'json',
            root: 'rows'
        }
    },
    autoLoad: true,
    autoSync: true
});

Ext.create('Olap.store.Templates',{
    storeId: 'OlapStoreTemplates',
});

