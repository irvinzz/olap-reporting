var Ext = Ext || {};
    
Ext.define('Olap.model.Template', {
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [{
        name: '_id',
        type: 'string'
    },
    {
        name: 'name',
        type: 'string'
    },
    {
        name: 'text',
        type: 'string'
    }]
});