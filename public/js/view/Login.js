var Ext = Ext || {};
var md5 = window.md5;
Ext.define('Olap.view.Login',{
    extend: 'Ext.window.Window',
    layout: 'fit',
    initComponent: function(){
        var me = this;
        me.callParent();
    },
    items: 
        {
            xtype: 'form',
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    fieldLabel: 'username',
                    name: 'user'
                },
                {
                    fieldLabel: 'password',
                    name: 'password',
                    renderer: function(val){
                        return 'pwd';
                    }
                }
            ],
            buttons: [
                {
                    text: 'Submit',
                    handler: function(){
                        var win = this.up('window');
                        var form = this.up('form');
                        if (form.isValid()){
                            var values = form.getForm().getValues();
                            /*console.log(password);
                            console.log(md5(password));*/
                            Ext.Ajax.request({
                                url: '/api/auth/local',
                                method: 'POST',
                                params:{
                                    user: values.user,
                                    password: md5(values.password)
                                },
                                success: function(response, opts){
                                    var loc = response.getResponseHeader('location');
                                    //window.location.replace(loc);
                                    win.close();
                                    Ext.History.add('/');
                                },
                                failure: function(response, opts){
                                    console.log('fail');
                                }
                            });
                        }
                    }
                }
            ]
        }
});
