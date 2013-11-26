var Ext = Ext || {};

Ext.require([
    'Olap.model.Report'
]);

Ext.define('Olap.store.Reports', {
    extend: 'Ext.data.Store',
    model: 'Olap.model.Report',
    proxy: {
        type: 'rest',
        url: '/api/reports',
        reader: {
            type: 'json',
            root: 'rows'
        }
    },
    autoLoad: true,
    autoSync: true
});

Ext.create('Olap.store.Reports',{
    storeId: 'OlapStoreReports',
});

