var Ext = Ext || {};

Ext.define('Olap.store.Sources.Elements',{
    extend: 'Ext.data.Store',
    fields: ['abbr','text'],
    proxy: {
        type: 'rest',
        url: '/api/palo/dimension/elements',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});