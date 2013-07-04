var Ext = Ext || {};
Ext.define('Olap.store.Sources.Cube',{
    extend: 'Ext.data.Store',
    fields: ['abbr','text'],
    proxy: {
        type: 'rest',
        url: '/api/palo/database/cubes',
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