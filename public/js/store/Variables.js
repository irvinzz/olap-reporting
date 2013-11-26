var Ext = Ext || {};

Ext.define('Olap.store.Variables', {
    extend: 'Ext.data.Store',
    model: 'Olap.model.Variable',
    proxy: {
        type: 'rest',
        url: '/api/variables',
        reader: {
            type: 'json',
            root: 'rows'
        }
    },
    autoLoad: false,
    autoSync: true
});