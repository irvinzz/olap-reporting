var Ext = Ext || {};

Ext.define('Olap.store.Sources.Elements',{
    extend: 'Ext.data.TreeStore',
    proxy: {
        type: 'ajax',
        url: '/api/palo/dimension/elements/tree'
    }
});