var Ext = Ext || {};
var md5 = md5 || function(){throw 'no md5 function found'; };

Ext.define('Olap.model.Palo.Servers', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',    type: 'int'   },
        {name: 'name',  type: 'string'},
        {name: 'ipaddress', type: 'string'},
        {name: 'port', type: 'int'},
        {name: 'login', type: 'string'},
        {name: 'password', type: 'string'}
    ]
});

Ext.define('Olap.store.Palo.Servers', {
    extend: 'Ext.data.Store',
    model: 'Olap.model.Palo.Servers',
    proxy: {
        type: 'rest',
        url: '/palo/servers',
        reader: {
            type: 'json'
        }
    },
    autoLoad: true,
    autoSync: true
});

Ext.define('Olap.view.palo.servers.List',{
    extend: 'Ext.grid.Panel',
    title: 'Список Серверов Palo',
    store: Ext.create('Olap.store.Palo.Servers'),
    selType: 'cellmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        })
    ],
    columns: [
        { text: 'Номер', dataIndex: 'id', flex: 0 },
        { text: 'Имя',  dataIndex: 'name', flex: 1, editor: 'textfield' },
        { text: 'Адрес', dataIndex: 'ipaddress', flex: 1, editor: 'textfield' },
        { text: 'Порт', dataIndex: 'port', flex: 0, editor: 'textfield' },
        { text: 'Логин', dataIndex: 'login', flex: 0, editor: 'textfield' },
        {
            text: 'Пароль',
            dataIndex: 'password',
            flex: 0,
            editor:{
                xtype:'textfield',
                inputType: 'password'
            },
            renderer: function(value){
                var r = '';
                for (var i=0;i<value.length;++i){
                    r+='*';
                }
                return r;
            }
        }
    ],
    listeners: {
        itemcontextmenu: function ( treePanel, record, item, index, e, eOpts ){
            e.preventDefault();
            if (this.itemcontextmenupanel===undefined){
                this.itemcontextmenupanel = new Ext.menu.Menu({
                    items: this.itemcontextmenu
                });
            }
            this.itemcontextmenupanel.selecteditem = record;
            this.itemcontextmenupanel.showAt(e.getXY());
            
        }/*,
        render:function(){
            var _this=this;            
            window.OlapNavigator.on('Olap.view.User.List.Update',function(){
                _this.store.load();
            });
        }*/
    },
    itemcontextmenu:[
        {
            text: 'info',
            handler: function(item, e, eOpts){
                Ext.Ajax.request({
                    url: '/api/server/info',
                    success: function(response){
                        console.log(response);
                    }
                });
            }
        },
        {
            text: 'load',
            handler: function(){
                Ext.Ajax.request({
                    url: '/api/server/load',
                    success: function(response){
                        console.log(response);
                    }
                });
            }
        },
        {
            text: 'login',
            handler: function(item,e,eOpts){
                var serverrecord = this.up().selecteditem.data;
                console.log(typeof md5);
                var x = md5('hello');
                console.log(x);
                var password = md5(serverrecord.password);
                var login = serverrecord.login;
                console.log(password);
                Ext.Ajax.request({
                    url: '/api/server/login?user='+login+'&password='+password,
                    success: function(response){
                        console.log(response);
                    },
                    
                });
            }
        },
        {
            text: 'logout',
            handler: function(){
                Ext.Ajax.request({
                    url: '/api/server/logout',
                    success: function(response){
                    }
                });
            }
        },
        {
            text: 'save',
        },
        {
            text: 'shutdown',
        }
    ],
    initComponent: function(){
        this.callParent();
    }
});








