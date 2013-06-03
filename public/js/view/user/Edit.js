var Ext = Ext || {};

Ext.define('Olap.view.User.Edit',{
    extend: 'Ext.form.Panel',
    title: 'Создание пользователя',
    method: 'POST',
    icon: '/img/icons/user_edit.png',
    initComponent: function(){
        var D = this.Data || {};
        this.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Ф.И.О.',
                name: 'name',
                allowBlank: false,
                value: D.name || ''
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Email',
                name: 'email',
                vtype: 'email',
                allowBlank: false,
                value: D.email || ''
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Телефон',
                name: 'phone',
                allowBlank: true,
                value: D.phone || ''
            },
            {
                xtype: 'filefield',
                name: 'photo',
                fieldLabel: 'Photo',
                labelWidth: 50,
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: 'Select Photo...'
            }
        ];
        //this.url = this.Data.id || '/user';
        if (this.Data!==undefined){
            //this.url  += this.Data.id;
            this.title = 'Редактирование пользователя';
            this.method = 'PUT'
        }
        this.callParent();
    },
    listeners:{
        beforeaction: function( _form, action, eOpts ){
            console.log(_form);
            console.log(action);
            console.log(eOpts);
        }
    },
    buttons:[
        {
            text: 'Сохранить',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            
            handler: function() {
                var form = this.up('form').getForm();
                var formPanel = this.up('form');
                if (form.isValid()) {
                    console.log(form.getValues());
                    /*form.submit({
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.msg,function(){
                                window.OlapNavigator.fireEvent('Olap.view.User.List.Update');
                                formPanel.close();
                                formPanel.destroy();
                            });
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result.msg);
                        }
                    });*/
                }
            }
        }
        
    ]
});











