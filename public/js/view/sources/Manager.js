var Ext = Ext || {};

Ext.require([
    'Olap.store.Sources.Server',
    'Olap.store.Sources.Database',
    'Olap.store.Sources.Cube',
    'Olap.store.Sources.CubeDimensions',
    'Olap.store.Sources.Elements',
    'Olap.view.sources.Elements',
    'Olap.view.common.Notification',
    'Olap.store.Coordinates'
]);
//  oh, my eyes, noooooooo. ~250...400 strings of code. it is so sad :-()
Ext.define('Olap.view.sources.Manager', {
    id: 'SourceManager',
    extend: 'Ext.container.Container',
    icon: '/img/icons/book_previous.png',
    title: 'Источники данных',
    singleInstance: true,
    layout: 'hbox',
    items: [{
        layout: 'vbox',
        xtype: 'container',
        height: '100%',
        defaults: {
            width: 500,
            xtype: 'combobox'
        },
        items: [{
            xtype: 'textfield',
            id: 'SourceNameField',
            fieldLabel: 'Имя источника'
        },{
            id: 'ServerBox',
            editable: false,
            fieldLabel: 'Сервер',
            store: 'Olap.store.Sources.Server',
        }, {
            id: 'DatabaseBox',
            editable: false,
            fieldLabel: 'БД',
            store: 'Olap.store.Sources.Database',
        }, {
            id: 'CubeBox',
            editable: false,
            fieldLabel: 'Куб',
            store: Ext.create('Olap.store.Sources.Cube'),
        }, {
            id: 'SourceTypeBox',
            editable: false,
            fieldLabel: 'Тип источника',
            store: Ext.create('Ext.data.Store', {
                fields: ['abbr', 'text'],
                data: [{
                    "abbr": "value",
                    "text": "Одно значение"
                }, {
                    "abbr": "values",
                    "text": "Множество значений"
                }, {
                    "abbr": "area",
                    "text": "Регион"
                }]
            })
        }, {
            xtype: 'gridpanel',
            id: 'CubeDimensionsGrid',
            editable: false,
            fieldLabel: 'Измерение',
            store: Ext.create('Olap.store.Sources.CubeDimensions'),
            columns: [{
                text: 'Abbr',
                dataIndex: 'abbr',
                flex: 1
            }, {
                text: 'Text',
                dataIndex: 'text',
                flex: 3
            }, {
                text: 'Значения',
                dataIndex: 'valueText',
                flex: 8
            }],
            flex: 1
        }, {
            id: 'ElementsTree',
            xtype: 'treepanel',
            flex: 2,
            height: 200,
            rootVisible: false,
            store: Ext.create('Olap.store.Sources.Elements')
        },{
            xtype: 'button',
            text: 'Add',
            itemId: 'AddButton'
        }]
    }, Ext.create('Olap.view.common.List',{
        
        xtype: 'gridpanel',
        id: 'CoordGrid',
        flex: 2,
        title: 'Источники',
        //store: Ext.data.StoreManager.lookup('OlapStoreCoordinates'),
        store: Ext.create('Olap.store.Coordinates',{
        }),
        columns: [{
            text: 'ID',
            dataIndex: 'id',
            flex: 1
        }, {
            text: 'Имя',
            dataIndex: 'name',
            flex: 3,
            editor: 'textfield'
        },{
            text: 'Server',
            dataIndex: 'server',
            flex: 1,
            editor: {
                xtype: 'combo',
                store: 'Olap.store.Sources.Server'
            }
        }, {
            text: 'DB',
            dataIndex: 'database',
            flex: 1,
            editor: {
                xtype: 'combo',
                store: 'Olap.store.Sources.Database'
            }
        }, {
            text: 'Cube',
            dataIndex: 'cube',
            flex: 1,
            editor: {
                xtype: 'combo',
                store: 'Olap.store.Sources.Cubes'
            }
        }, {
            text: 'Координаты',
            dataIndex: 'paths',
            flex: 9
        }],
        height: '100%',
        tbar: [{
            text: 'Удалить',
            itemId: 'RemoveButton'
        }, {
            text: 'Получить значение',
            itemId: 'ReceiveValueButton'
        }, {
            text: 'Dump',
            itemId: 'DumpButton'
        }],
        /*dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            store: Ext.data.StoreManager.lookup('OlapStoreCoordinates'),
        }]*/
    })
    ]
});

console.log(Ext.data.StoreManager.lookup('OlapStoreCoordinates'));






/*var AddCoordButton = Ext.create('Ext.button.Button',{
            id: 'AddCoorButton',
            text: 'Добавить координату',
            handler: function(){
                var records = ElementsTree.getView().getChecked();
                var names = [];
                var textNames = [];
                           
                Ext.Array.each(records, function(rec){
                    names.push(rec.raw.element);
                    textNames.push(rec.get('text'));
                });
                var c = curr();
                var data = CubeDimensionsGrid.getView().getSelectionModel().getSelection()[0].data;
                var key = data.abbr;
                var text = data.text;
                console.log(data);
                if (CoordStore.findRecord('dimension',key.toString())===null){
                    if (textNames.length===0){
                        Ext.create('Olap.view.common.Notification', {
                            title: 'Ошибка',
                            html: 'Выберите оп крайней мере 1 координату'
                        }).show(); 
                    }else{
                        CoordStore.add({
                            database: c.database,
                            cube: c.cube,
                            dimensionText: text,
                            dimension: key,
                            value: names,
                            valueText: textNames
                        });
                    }
                }else{
                    Ext.create('Olap.view.common.Notification', {
                        title: 'Ошибка',
                        html: 'Измерение `'+text+'` ('+key+') уже использовано'
                    }).show(); 
                }
                
            }
        });*/
        
        /*
                        {
                    xtype: 'button',
                    text: 'debug',
                    handler: function(){
                         Ext.create('Ext.ux.window.Notification', {
                            title: 'Уведомление',
                            position: 'br',
                            manager: 'demo1',
                            iconCls: 'ux-notification-icon-information',
                            autoCloseDelay: 3000,
                            spacing: 20,
                            html: JSON.stringify(curr())
                        }).show(); 
                        console.log(curr());
                    }
                },
                {
                    xtype: 'button',
                    text: 'Preview',
                    handler: function(){
                        var coords = [];
                        function onReceive(){
                            //  http://olap.rts-ugra.ru:7921/cell/values?sid=0000&database=1&cube=7&paths=0,0,0,0,0,0:1,0,0,0,0,0
                            console.log(coords);
                        }
                        var total = CoordGrid.store.getCount();
                        if (total<2){
                            Ext.create('Olap.view.common.Notification', {
                                title: 'Ошибка',
                                html: 'Требуется по меньшей мере 2 измерения'
                            }).show(); 
                        }else{
                            var i = 0;
                            
                            CoordGrid.store.each(function(record){
                                coords.push(record.data.value.split(','));
                                if (++i>=total){
                                    onReceive();
                                }
                            });
                            
                        }
                    }
                },*/