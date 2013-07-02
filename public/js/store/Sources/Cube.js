Ext.define('Olap.store.Sources.Cube',{
    extend: 'Ext.data.Store',
    fields: ['abbr','text'],
    proxy: {
        type: 'rest',
        url: '/api/palo/database/cubes',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});