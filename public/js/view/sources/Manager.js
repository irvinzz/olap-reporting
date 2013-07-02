var Ext = Ext || {};

Ext.require([
    'Olap.store.Sources.Database',
    'Olap.store.Sources.Cube',
    'Olap.store.Sources.CubeDimensions',
    'Olap.store.Sources.Elements',
    'Olap.view.sources.Elements'
]);

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
            var dimension;
            try{
                database = DbBox.findRecordByValue(DbBox.getValue()).data.abbr ;
            }catch(e){}
            try{
                cube = CubeBox.findRecordByValue(CubeBox.getValue()).data.abbr;
            }catch(e){}
            try{
                dimension = CubeDimensionsBox.findRecordByValue(CubeDimensionsBox.getValue()).data.abbr;
            }catch(e){}
            return {
                database: database,
                cube: cube,
                dimension: dimension,
                multiselect: treeMultiselect
            };
        };
        var DbStore = Ext.create('Olap.store.Sources.Database');
        var CubeStore = Ext.create('Olap.store.Sources.Cube');
        var CubeDimensionsStore = Ext.create('Olap.store.Sources.CubeDimensions');
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
                            CubeDimensionsBox.setValue(CubeDimensionsStore.getAt(0));
                        }
                    });
                }
            }
        });
        var CubeDimensionsBox = Ext.create('Ext.form.field.ComboBox',{
            editable: false,
            fieldLabel: 'Измерение',
            store: CubeDimensionsStore,
            //multiSelect: true,
            width: 400,
            listeners: {
                change: function( combo, newValue, oldValue, eOpts ) {
                    ElementsStore.load({
                        params: curr(),
                        callback: function(records, operation, success){
                            ElementsBox.setValue(ElementsStore.getAt(0));
                        }
                    });
                    ElementsTreeStore.load({
                        params: curr(),
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
                }
            }
        });

        var ElementsBox = Ext.create('Ext.form.field.ComboBox',{
            fieldLabel: 'Элементы',
            store: ElementsStore,
            width: 400            
        });
        
        Ext.define('Olap.model.Coordinate',{
            extend: 'Ext.data.Model',
            fields: [
                {name: 'dimension',  type: 'string'},
                {name: 'value',   type: 'string'}
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
                    }
                },
                remove: function( store, record, index, isMove, eOpts ){
                    if (store.getCount()===0){
                        SourceTypeBox.enable();
                    }
                }
            }
        });
        var CoordGrid = Ext.create('Ext.grid.Panel',{
            flex: 2,
            title: 'Координаты',
            store: CoordStore,
            columns: [
                { text: 'Измерение',  dataIndex: 'dimension' },
                { text: 'Значение', dataIndex: 'value', flex: 1 }
            ],
            height: '100%',
            width: 500,
            tbar: [{
                text: 'remove',
                scope: this,
                handler: function(){
                    CoordStore.remove(CoordGrid.getView().getSelectionModel().getSelection( ));
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
            store: ElementsTreeStore
        });
        var AddCoordButton = Ext.create('Ext.button.Button',{
            text: 'Добавить координату',
            handler: function(){
                var records = ElementsTree.getView().getChecked(),
                    names = [];
                           
                Ext.Array.each(records, function(rec){
                    names.push(rec.get('text'));
                });
                CoordStore.add({
                    dimension: CubeDimensionsBox.getValue(),
                    value: names.join(', ')
                });
            }
        });
        this.layout = 'hbox';
        this.style = {
            //background: 'cyan'
        };
        
        this.items = [
            {
                layout: 'vbox',
                xtype: 'container',
                height: '100%',
                items: [
                    DbBox,
                    
                    CubeBox,
                    SourceTypeBox,
                    CubeDimensionsBox,
                    ElementsBox,
                    ElementsTree,
                    AddCoordButton,
                    {
                        xtype: 'button',
                        text: 'debug',
                        handler: function(){
                            console.log(curr());
                        }
                    },
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















































































