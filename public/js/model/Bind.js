var Ext = Ext || {};

Ext.define('Olap.model.Bind',{
    extend: 'Ext.data.Model',
    idProperty: '_id',
    fields:[{
        name: '_id',
        type: 'string'
    },{
        name: 'variable',
        type: 'string'
    },{
        name: 'link',
        type: 'string'
    },{
        name: 'report',
        type: 'string'
    }]
});