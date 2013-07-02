var Ext = Ext || {};

Ext.define('Olap.store.User', {
    extend: 'Ext.data.Store',
    model: 'Olap.model.User',
    proxy: {
        type: 'rest',
        url: '/api/user',
        reader: {
            type: 'json',
            root: 'rows'
        },
        extraParams:{
            includeDeleted: true
        }
    },
    autoLoad: true,
    autoSync: true
});