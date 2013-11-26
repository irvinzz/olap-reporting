var Ext = Ext || {};

Ext.define('Olap.store.Binds',{
    extend: 'Ext.data.Store',
    model: 'Olap.model.Bind',
    proxy: {
        type: 'rest',
        url: '/api/binds',
        reader: {
            type: 'json',
            root: 'rows'
        }
    },
    autoLoad: false,
    autoSync: true
});