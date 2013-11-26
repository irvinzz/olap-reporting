var Ext = Ext || {};

Ext.define('Olap.model.Variable',{
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields: [{
        name: '_id',
        type: 'string'
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'type',
        type: 'string'
    },{
        name: 'hint',
        type: 'string'
    },{
        name: 'template',
        type: 'string'
    }]
});