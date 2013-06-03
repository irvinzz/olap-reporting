var Ext = Ext || {};

Ext.define('Olap.model.Users', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',    type: 'int'   },
        {name: 'name',  type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'deleted', type: 'boolean'}
    ]
});

Ext.define('Olap.store.Users', {
    extend: 'Ext.data.Store',
    model: 'Olap.model.Users',
    proxy: {
        type: 'rest',
        url: '/user',
        reader: {
            type: 'json'
        },
        extraParams:{
            includeDeleted: true
        }
    },
    autoLoad: true,
    autoSync: true
});

Ext.define('Olap.view.user.List',{
    extend: 'Ext.grid.Panel',
    title: 'Список пользователей',
    xtype: 'OlapViewUserList',
    //store: Ext.data.StoreManager.lookup('simpsonsStore'),
    store: Ext.create('Olap.store.Users'),
    selType: 'cellmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2,
            listeners: {
                beforeedit: function( editor, e, eOpts ){
                },
                canceledit: function( editor, e, eOpts ){
                },
                edit: function (editor, e, eOpts ){
                },
                validateedit: function( editor, e, eOpts ){
                }
            }
        })
    ],
    columns: [
        { text: 'Идентификатор', dataIndex: 'id', flex: 0 },
        { text: 'ФИО',  dataIndex: 'name', flex: 1, editor: 'textfield' },
        { text: 'Email', dataIndex: 'email', flex: 1, editor: { xtype: 'textfield', vtype: 'email'} },
        { text: 'Телефон', dataIndex: 'phone', flex: 0, editor: 'textfield' },
        { text: 'Удален', dataIndex: 'deleted', flex: 0, renderer: function(val){ return val===true ? 'УДАЛЕН' : '' }},
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
        /*itemclick: function(_this, record, item, index, e, eOpts ){
            console.log('clock');
        },*/
        render:function(){
            var _this=this;            
            window.OlapNavigator.on('Olap.view.User.List.Update',function(){
                _this.store.load();
            });
        }
    },
    itemcontextmenu:[
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
        }
    ],
    initComponent: function(){
        this.callParent();
    }
});








