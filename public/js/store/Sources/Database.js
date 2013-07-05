var Ext = Ext || {};

Ext.define('Olap.store.Sources.Database',{
    extend: 'Ext.data.Store',
    fields: ['abbr', 'text'],
    proxy: {
         type: 'rest',
         url: '/api/palo/server/databases',
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

Ext.create('Olap.store.Sources.Database',{
    storeId: 'Olap.store.Sources.Database'
});