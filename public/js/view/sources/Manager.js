var Ext = Ext || {};

Ext.require([
    'Olap.store.Sources.Database',
    'Olap.store.Sources.Cube',
    'Olap.store.Sources.CubeDimensions',
    'Olap.store.Sources.Elements',
    'Olap.view.sources.Elements',
    'Olap.view.common.Notification'
]);
//  oh, my eyes, noooooooo. ~250...400 strings of code. it is so sad :-()
Ext.define('Olap.view.sources.Manager',{
    extend: 'Ext.container.Container',
    icon: '/img/icons/book_previous.png',
    title: 'Источники данных',
    singleInstance: true,
    initComponent: function(){
        var treeMultiselect = false;
        var curr = function() {
            var database;
            var cube;
            //var dimension;
            try{
                database = DbBox.findRecordByValue(DbBox.getValue()).data.abbr ;
            }catch(e){}
            try{
                cube = CubeBox.findRecordByValue(CubeBox.getValue()).data.abbr;
            }catch(e){}
            /*try{
                dimension = CubeDimensionsBox.findRecordByValue(CubeDimensionsBox.getValue()).data.abbr;
            }catch(e){}*/
            var ret={};
            (database !== undefined ? ret.database = database : {} );
            (cube !== undefined ? ret.cube = cube : {});
            //(dimension !== undefined ? ret.dimension = dimension : {});
            ret.multiselect = treeMultiselect;
            return ret;
        };
        var DbStore = Ext.create('Olap.store.Sources.Database');
        var CubeStore = Ext.create('Olap.store.Sources.Cube');
        var CubeDimensionsStore = Ext.create('Olap.store.Sources.CubeDimensions',{
            listeners: {
                load: function(store, records, successful, eOpts){
                    //ElementsTreeStore.removeAll();
                    
                    /*CubeDimensionsGrid.getView().focusNode(store.getAt(0));
                    var c = curr();*/
                    /*c.dimension = store.getAt(0).data.abbr;
                    ElementsTreeStore.load({
                        params: c,
                        callback: function(records, operation, success){
                            
                        }
                    });*/
                }
            }
        });
        var ElementsStore = Ext.create('Olap.store.Sources.Elements');
        var DbBox = Ext.create('Ext.form.field.ComboBox',{
            editable: false,
            fieldLabel: 'БД',
            store: DbStore,
            width: 400,
            listeners:{
                render: function(){
                    DbStore.load(function(){
                        DbBox.setValue(DbStore.getAt(0));
                    });
                },
                change: function( combo, newValue, oldValue, eOpts ){
                    CubeStore.load({
                        params:curr(),
                        callback: function(records, operation, success){
                            CubeBox.setValue(CubeStore.getAt(0));
                        }
                    });
                },
                
            }
        });
        var CubeBox = Ext.create('Ext.form.field.ComboBox',{
            editable: false,
            fieldLabel: 'Куб',
            store: CubeStore,
            width: 400,
            listeners:{
                change: function( combo, newValue, oldValue, eOpts ){
                    CubeDimensionsStore.load({
                        params:curr(),
                        callback: function(records, operation, success){
                            CubeDimensionsGrid.getView().getSelectionModel().select(records[0]);
                        }
                    });
                }
            }
        });
        var CubeDimensionsGrid = Ext.create('Ext.grid.Panel',{
            editable: false,
            fieldLabel: 'Измерение',
            store: CubeDimensionsStore,
            columns: [
                {text: 'Abbr', dataIndex: 'abbr',flex: 1},
                {text: 'Text', dataIndex: 'text', flex: 3},
                {text: 'Значения', dataIndex: 'valueText', flex: 3}
            ],
            width: 400,
            flex: 1,
            listeners: {
                select: function ( tree, record, index, eOpts ) {
                //change: function( combo, newValue, oldValue, eOpts ) {
                    var c = curr();
                    c.dimension = record.data.abbr;
                    ElementsTreeStore.load({
                        params: c,
                        callback: function(records, operation, success){
                            
                        }
                    });
                }
            }
        });
        var SourceTypeBox = Ext.create('Ext.form.field.ComboBox',{
            editable: false,
            fieldLabel: 'Тип источника',
            width: 400,
            store: Ext.create('Ext.data.Store',{
                fields: ['abbr', 'text'],
                data : [
                    {"abbr":"value", "text":"Одно значение"},
                    {"abbr":"values", "text":"Множество значений"},
                    {"abbr":"area", "text":"Регион"}
                ]
            }),
            listeners: {
                change: function( combo, newValue, oldValue, eOpts ){
                    var abbr = combo.findRecordByValue(newValue).data.abbr;
                    switch (abbr){
                        case 'value':
                            treeMultiselect = false;
                            ElementsTreeStore.load({
                                params: curr()
                            });
                            break;
                        case 'values':
                        case 'area':
                            treeMultiselect = true;
                            ElementsTreeStore.load({
                                params: curr()
                            });
                            break;
                    }
                },
                render: function( combo, eOpts){
                    combo.setValue(SourceTypeBox.store.getAt(0));
                }
            }
        });

        /*var ElementsBox = Ext.create('Ext.form.field.ComboBox',{
            fieldLabel: 'Элементы',
            store: ElementsStore,
            width: 400            
        });*/
        
        Ext.define('Olap.model.Coordinate',{
            extend: 'Ext.data.Model',
            fields: [
                {name: 'name',  type: 'string' },
                {name: 'paths', type: 'string'}
            ]
        });
        
        var CoordStore = Ext.create('Ext.data.Store', {
            model: 'Olap.model.Coordinate',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'rows'
                }
            },
            listeners: {
                add: function( store, records, index, eOpts){
                    if (store.getCount()!==0){
                        SourceTypeBox.disable();
                        DbBox.disable();
                        CubeBox.disable();
                    }
                },
                remove: function( store, record, index, isMove, eOpts ){
                    if (store.getCount()===0){
                        DbBox.enable();
                        CubeBox.enable();
                        SourceTypeBox.enable();
                    }
                }
            }
        });
        var CoordGrid = Ext.create('Ext.grid.Panel',{
            flex: 2,
            title: 'Источники',
            store: CoordStore,
            columns: [
                { text: 'Имя',  dataIndex: 'name',flex:1 },
                { text: 'Координаты', dataIndex: 'paths', flex:3 }
            ],
            height: '100%',
            width: 500,
            tbar: [{
                text: 'Удалить',
                handler: function(){
                    CoordStore.remove(CoordGrid.getView().getSelectionModel().getSelection( ));
                }
            },{
                text: 'Получить значение',
                handler: function(){
                    var item = CoordGrid.getView().getSelectionModel().getSelection()[0];
                    var obj = JSON.parse(item.data.paths);
                    var query = {
                        database: obj.database,
                        cube: obj.cube,
                        paths: obj.paths.join(':')
                    };
                    Ext.Ajax.request({
                        method: 'GET',
                        url: '/api/palo/cell/values',
                        params: query,
                        success: function(response, opts){
                            var result = JSON.parse(response.responseText);
                            Ext.Msg.alert('Ответ',result.rows[0].value + ' по адресу '+result.rows[0].coordinate);
                            console.log(response,opts);
                        },
                        failure: function(response, opts){
                            console.log(response,opts);
                        }
                    });
                    console.log(obj);
                }
            }]
        });
        var ElementsTreeStore = Ext.create('Ext.data.TreeStore',{
            proxy: {
                type: 'ajax',
                url: '/api/palo/dimension/elements/tree'
            }
        });
    
        var ElementsTree = Ext.create('Olap.view.sources.Elements',{
            flex: 2,
            height: 200,
            width: 400,
            store: ElementsTreeStore,
            listeners: {
                select: function( tree, record, index, eOpts ){
                    var DimRec = CubeDimensionsGrid.getView().getSelectionModel().getSelection()[0];
                    DimRec.set('valueText',record.raw.text);
                    DimRec.set('value',record.raw.element);
                }
            }
        });
        var AddCoordButton = Ext.create('Ext.button.Button',{
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
        });
        this.layout = 'hbox';
        this.style = {
            //background: 'cyan'
        };
        var SourceName = Ext.create('Ext.form.field.Text',{
            fieldLabel: 'Имя источника',
            width: 400
        });
        this.items = [
            {
                layout: 'vbox',
                xtype: 'container',
                height: '100%',
                items: [
                    SourceName,
                    DbBox,
                    
                    CubeBox,
                    SourceTypeBox,
                    CubeDimensionsGrid,
                    //ElementsBox,
                    ElementsTree,
                    AddCoordButton,
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
                                console.log('fine');
                                var i = 0;
                                
                                CoordGrid.store.each(function(record){
                                    coords.push(record.data.value.split(','));
                                    if (++i>=total){
                                        onReceive();
                                    }
                                });
                                
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'dump',
                        handler: function(){
                            var coord = [];
                            CubeDimensionsStore.each(function(record){
                                var val = record.data.value;
                                if (val.length === 0){
                                     Ext.create('Olap.view.common.Notification', {
                                        title: 'Ошибка',
                                        html: 'Элемент `'+record.data.abbr+'` не содержит значения'
                                    }).show(); 
                                    return false;
                                }else{
                                    
                                    coord.push(val);
                                }
                                
                                
                            });
                            var c = curr();
                            var coordinate = {
                                database: c.database,
                                cube: c.cube,
                                paths: [coord],
                            };
                            var name = SourceName.getValue();
                            CoordStore.add({
                                name: name,
                                paths: JSON.stringify(coordinate)
                            });
                        }
                    }
                ],
                style: {
                   //background: 'yellow'
                }
            },
            CoordGrid                               
        ];
        this.callParent();
    }
});















































































