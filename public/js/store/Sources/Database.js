Ext.define('Olap.store.Sources.Database',{
    extend: 'Ext.data.Store',
    fields: ['abbr', 'text'],
    proxy: {
         type: 'rest',
         url: '/api/palo/server/databases',
         reader: {
             type: 'json',
             root: 'rows'
         }
     }
});