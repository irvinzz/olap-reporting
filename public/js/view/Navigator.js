var Ext = Ext || {};

Ext.define('Olap.store.Navigator',{
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            {
                text: "Пользователи",
                leaf: true,
                icon: '/img/icons/folder_user.png',
                entryId: 'Olap.view.user.Manager',
                contextmenu:[
                    {
                        text: 'Управление пользователями',
                        iconCls: 'edit',
                        icon: '/img/icons/users.png',
                        handler: function(){
                            window.OlapNavigator.fireEvent('Olap.view.Navigator.onSelect','Olap.view.user.Manager');
                        }
                    },
                    '-',
                    {
                        text: 'Новый пользователь',
                        icon: '/img/icons/user_add.png',
                        handler: function(){
                            window.OlapNavigator.fireEvent('Olap.view.Navigator.Navigate',['Olap.view.user.Edit']);
                        }
                    }
                ]
            },
            {
                text: 'Группы',
                leaf: true,
                icon: '/img/icons/group.png'
            },
            {
                text: "Отчеты",
                entryId: 'olap.reports.navigator',
                expanded: true,
                icon: '/img/icons/report.png',
                children: [
                    {
                        text: "Шаблоны",
                        leaf: true,
                        icon: '/img/icons/script.png',
                        entryId: 'Olap.view.templates.Edit'
                    },
                    {
                        text: "Рассылки",
                        leaf: true,
                        icon: '/img/icons/email.png',
                        entryId: 'Olap.view.Schedule.Manager'
                    }
                ]
            },
            {
                text: 'RedisCommander',
                entryId: 'Olap.view.RedisCommander',
                icon: '/img/rediscommander.png',
                leaf: true
            },
            {
                text: 'Palo',
                icon: '/img/icons/palo.png',
                children: [
                    {
                        text: 'Сервера',
                        leaf: true,
                        entryId: 'Olap.view.palo.servers.Manager'
                    },
                    {
                        text: 'Базы данных',
                        leaf: true,
                        entryId: 'Olap.view.palo.databases.Manager'
                    },
                    {
                        text: 'Dimensions',
                        leaf: true
                    },
                    {
                        text: 'Element',
                        leaf: true
                    },
                    {
                        text: 'Cube',
                        leaf: true
                    },
                    {
                        text: 'Cell',
                        leaf: true
                    },
                    {
                        text: 'Event',
                        leaf: true
                    },
                    {
                        text: 'Rule',
                        leaf: true
                    },
                    {
                        text: 'Svs',
                        leaf: true
                    },
                ]
            }
        ]
    }
});

Ext.define('Olap.view.Navigator',{
    extend: 'Ext.tree.Panel',
    id: 'Navigator',
    title: 'Навигатор',
    rootVisible: false,
    store: Ext.create('Olap.store.Navigator',{}),
    //flex: 2,
    //layout: 'fit',
    /*,
    columns: [{
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: 'Элемент',
        flex: 2,
        sortable: true,
        dataIndex: 'LibraryName'
    }]*/
    listeners: {
        containerclick: function( tp, e, eOpts ){
        },
        celldblclick: function( treePanel, td, cellIndex, record, tr, rowIndex, e, eOpts ){
            var entryId = record.raw.entryId;
            this.fireEvent('Olap.view.Navigator.onSelect',entryId);
        },
        itemcontextmenu: function ( treePanel, record, item, index, e, eOpts ){
            if (record.raw.contextmenu!==undefined){
                e.preventDefault();
                var contextMenu = new Ext.menu.Menu({
                    items: record.raw.contextmenu
                });
                contextMenu.showAt(e.getXY());
            }
        }
    },
    initComponent: function(){
        this.addEvents('Olap.view.Navigator.onSelect');
        this.addEvents('Olap.view.Navigator.Navigate');
        this.addEvents('Olap.controller.User.Delete');
        this.callParent();
        window.OlapNavigator = this;
    }
});

