var Ext = Ext || {};

Ext.require([
    'Olap.model.Coordinate'
]);

Ext.define('Olap.store.Coordinates', {
    model: 'Olap.model.Coordinate',
    proxy: {
        type: 'rest',
        url: '/api/coordinates',
        reader: {
            type: 'json',
            root: 'rows'
        }
    },
    autoLoad: true,
    autoSync: true
});