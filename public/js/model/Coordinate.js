var Ext = Ext || {};
    
Ext.define('Olap.model.Coordinate', {
    extend: 'Ext.data.Model',
    fields: [
    //{name: 'id', type: 'int'},
    {
        name: 'server',
        type: 'int'
    },
    {
        name: 'cube',
        type: 'int'
    }, {
        name: 'database',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'paths',
        type: 'string'
    }, {
        name: 'configure',
        type: 'string'
    }]
});