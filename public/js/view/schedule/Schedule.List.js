var Ext = Ext || {};

Ext.define('Olap.store.Schedule', {
    extend: 'Ext.data.Store',
    fields:['name', 'email', 'phone'],
    data:{'items':[
        { 'id': 0, 'name': 'Симпсонова Лиза Гомеровна',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
        { 'id': 1, 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
        { 'id': 2, 'name': 'Симпсонов Гомер Абрахамович', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
        { 'id': 3, 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  },
        { 'id': 4, 'name': 'Симпсонов Абрахам', "email":"abe@simpsons.com", "phone":"555-222-1723"  }
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});

Ext.define('Olap.view.Schedule.List',{
    extend: 'Ext.grid.Panel',
    title: 'Список пользователей',
    //store: Ext.data.StoreManager.lookup('simpsonsStore'),
    store: Ext.create('Olap.store.Schedule'),
    //plugins: ['cellediting', 'gridviewdragdrop'],
    columns: [
        { text: 'Идентификатор', dataIndex: 'id', flex: 0 },
        { text: 'ФИО',  dataIndex: 'name', flex: 1 },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Телефон', dataIndex: 'phone', flex: 0 }
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
        itemclick: function(_this, record, item, index, e, eOpts ){
            console.log('clock');
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
        this.navigator = Ext.ComponentQuery.query('#Navigator')[0];
    }
});








