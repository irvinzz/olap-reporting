var Ext = Ext || {};

Ext.define('Olap.model.Palo.Databases', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'database',    type: 'int'   },
        {name: 'name_database',  type: 'string'},
        {name: 'number_dimensions', type: 'int'},
        {name: 'number_cubes', type: 'int'},
        {name: 'status', type: 'int'},
        {name: 'type', type: 'int'},
        {name: 'database_token', type: 'string'}
    ]
});

Ext.define('Olap.store.Palo.Databases', {
    extend: 'Ext.data.Store',
    model: 'Olap.model.Palo.Databases',
    proxy: {
        type: 'rest',
        url: '/palo/databases',
        reader: {
            type: 'json'
        }
    },
    autoSync: true
});

Ext.define('Olap.view.Palo.Databases.List',{
    extend: 'Ext.grid.Panel',
    title: 'Список Баз Данных',
    store: Ext.create('Olap.store.Palo.Databases'),
    selType: 'cellmodel',
    columns: [
        { text: 'Идентификатор', dataIndex: 'database', flex: 0 },
        { text: 'Имя',  dataIndex: 'name_database', flex: 1},
        { text: 'Число измерений', dataIndex: 'number_dimensions', flex: 1},
        { text: 'Число кубов', dataIndex: 'number_cubes', flex: 0},
        { text: 'Статус', dataIndex: 'status', flex: 0},
        { text: 'Тип', dataIndex: 'type', flex: 0},
        { text: 'Токен', dataIndex: 'database_token', flex: 0}
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
            
        },
        render: function(){
            this.store.load();
        }/*,
        render:function(){
            var _this=this;            
            window.OlapNavigator.on('Olap.view.User.List.Update',function(){
                _this.store.load();
            });
        }*/
    },
    itemcontextmenu:[
        /*{
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
            text: 'Редактировать',
            icon: '/img/icons/user_edit.png',
            handler: function ( item, e, eOpts ){
                this.navigator = Ext.ComponentQuery.query('#Navigator')[0];
                this.navigator.fireEvent('Olap.view.Navigator.Navigate',['Olap.view.User.Edit',{ Data: this.up().selecteditem.data}]);
            }
        },
        '-',
        {
            text: 'Удалить',
            icon: '/img/icons/user_delete.png',
            handler: function(item, e ,eOpts){
                this.navigator = Ext.ComponentQuery.query('#Navigator')[0];
                this.navigator.fireEvent('Olap.controller.User.Delete',this.up().selecteditem.data);
            }
        }*/
    ],
    initComponent: function(){
        this.callParent();
    }
});








