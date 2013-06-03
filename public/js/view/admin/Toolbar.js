var Ext = Ext || {};


Ext.define('Olap.view.admin.Toolbar',{
    extend: 'Ext.toolbar.Toolbar',
    alias: 'olapViewMainToolBar',
    items:[
        {
            xtype: 'button',
            text: '#',
            icon: '/img/icons/application.png',
            menu: [
                {
                    text: 'item0'
                },
                '-',
                {
                    text: 'Выход',
                    listeners: {
                        click: function(){
                            Ext.Msg.confirm('Вы действительно хотите выйти?','msg',function(button){
                                if (button==='yes'){
                                    console.log(window.close());
                                }
                            });
                                
                        }
                    }
                }
            ]
        },
        {
            xtype: 'button',
            text: 'Редактирование',
            icon: '/img/icons/application_edit.png'
        },
        '-',
        {
            xtype: 'button',
            text: 'Помощь',
            menu: [
                {
                    text: 'Помощь'
                },
                '-',
                {
                    text: 'О программе'
                }
            ],
            icon: '/img/icons/help.png'
        }
    ]
});