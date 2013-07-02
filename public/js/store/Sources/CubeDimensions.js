
Ext.define('Olap.store.Sources.CubeDimensions',{
    extend: 'Ext.data.Store',
    fields: ['abbr','text'],
    proxy: {
        type: 'rest',
        url: '/api/palo/cube/info/dimensions',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});