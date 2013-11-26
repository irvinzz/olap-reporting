var Ext = Ext || {};
    
Ext.define('Olap.model.Report', {
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
        name: 'template',
        type: 'string'
    }/*,
    {
        name: 'binds',
        type: 'auto'
        }
    }*/]
});