var Ext = Ext || {};

Ext.application({
    name: 'HelloExt',
    //controllers: ['Olap.controller.MainWindow'],
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
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
                            fieldLabel: 'extern_password',
                            name: 'password'
                        }
                    ],
                    buttons: [
                        {
                            text: 'Submit',
                            handler: function(){
                                var form = this.up('form');
                                if (form.isValid()){
                                    form.submit({
                                        url: '/ctrl/auth/local',
                                        success: function(form, action){
                                            console.log(action);
                                            console.log('success');
                                        },
                                        failure: function(form, action){
                                            console.log(action);
                                            console.log('failure');
                                        }
                                    });
                                }
                            }
                        }
                    ]
                }
        });
    }
});
