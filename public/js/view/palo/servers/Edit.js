var Ext = Ext || {};

Ext.define('Olap.view.palo.servers.Edit',{
    extend: 'Ext.form.Panel',
    title: 'Создание Сервера',
    initComponent: function(){
        var D = this.Data || {};
        this.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Имя',
                name: 'name',
                allowBlank: false,
                value: D.name || ''
            },
            {
                xtype: 'textfield',
                fieldLabel: 'IP-Адрес',
                name: 'ipaddress',
                allowBlank: false,
                value: D.email || ''
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Порт',
                name: 'port',
                allowBlank: true,
                value: D.phone || ''
            }
        ];
        if (this.Data!==undefined){
            this.title = 'Редактирование серверов';
        }
        this.callParent();
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
                    form.submit({
                        url: '/api/palo.servers',
                        success: function(form, action) {
                            Ext.Msg.alert('Success', action.result.msg,function(){
                                window.OlapNavigator.fireEvent('Olap.view.Olap.Servers.List.Update');
                                formPanel.close();
                                formPanel.destroy();
                            });
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result.msg);
                        }
                    });
                }
            }
        }
        
    ]
});











