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
            submit1: function(){
                var win = this.up('window');
                var form = this;
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
                            win.close();
                            Ext.History.add('/');
                        },
                        failure: function(response, opts){
                            Ext.Msg.alert('Authorize', 'Wrong login or password');
                        }
                    });
                }
            },
            items: [
                {
                    fieldLabel: 'username',
                    name: 'user'
                },
                {
                    fieldLabel: 'password',
                    name: 'password',
                    inputType: 'password',
                    listeners: {
                        specialkey: function( field, e, eOpts ){
                            if (e.getKey() == e.ENTER) {
                                var form = field.up('form');
                                form.submit1();
                            }
                        }
                    }
                }
            ],
            buttons: [
                {
                    text: 'Submit',
                    handler: function(){
                        this.up('form').submit1();
                    }
                }
            ]
        }
});
