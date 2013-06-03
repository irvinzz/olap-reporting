var Ext = Ext || {};

Ext.define('Olap.controller.User',{
    extend: 'Ext.app.Controller',
    init: function(){
    },
    'delete': function(id,callback){
        Ext.Ajax.request({
            url: '/user/'+id,
            method: 'DELETE',
            success: function(response){
                callback(null,response);
            },
            failure: function(response){
                callback(response,null);
            }
        });
    }
});
