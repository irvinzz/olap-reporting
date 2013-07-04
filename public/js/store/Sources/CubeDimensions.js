var Ext = Ext || {};

Ext.define('Olap.model.Sources.CubeDimensions', {
     extend: 'Ext.data.Model',
     fields: [
         {name: 'abbr', type: 'string'},
         {name: 'text',  type: 'string'},
         {name: 'value',       type: 'string'},
         {name: 'valueText',  type: 'string'}
     ]
 });

Ext.define('Olap.store.Sources.CubeDimensions',{
    extend: 'Ext.data.Store',
    model: 'Olap.model.Sources.CubeDimensions',
    proxy: {
        type: 'rest',
        url: '/api/palo/cube/info/dimensions',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});