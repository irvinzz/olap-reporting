var Ext = Ext || {};

Ext.define('Olap.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',    type: 'int'   },
        {name: 'name',  type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'deleted', type: 'boolean'}
    ]
});