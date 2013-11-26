var Ext = Ext || {};
Ext.define('Olap.store.Sources.Server',{
    extend: 'Ext.data.Store',
    fields: ['abbr','text'],
    proxy: {
        type: 'rest',
        url: '/api/palo/servers',
        extraParams: {
            //show_system: 1,
            //show_user_info: 1
        },
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});

Ext.create('Olap.store.Sources.Server',{
    storeId: 'Olap.store.Sources.Server'
});