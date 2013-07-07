var Ext = Ext || {};
var _ = _ || {};

Ext.define('Olap.controller.SourceManager',{
    extend: 'Ext.app.Controller',
    getCurr: function(){
        var r = {};
        var dbbox = this.getDatabaseBox();
        var cubebox = this.getCubeBox();
        var cubedimensionsgrid = this.getCubeDimensionsGrid();
        try { r.database = dbbox.findRecordByValue(dbbox.getValue()).data.abbr; } catch(e) {}
        try { r.cube = cubebox.findRecordByValue(cubebox.getValue()).data.abbr; } catch(e) {}
        try { r.dimension = cubedimensionsgrid.getView().getSelectionModel().getSelection()[0].get('abbr'); } catch (e) {}
        r.multiselect = this.multiselect;
        return r;
    },
    multiselect: false,
    init: function(){
        var me = this;
        this.control({
            '#SourceManager':{
                render: function(){
                    //  !
                }
            },
            '#SourceManager #DatabaseBox':{
                render: function(){
                    var box = me.getDatabaseBox();
                    var store = box.store;
                    store.load(function(){
                        box.setValue(store.getAt(0));
                    });
                },
                change: function(combo, newValue, oldValue, eOpts){
                    var box = me.getCubeBox();
                    var store = box.store;
                    store.load({
                        params: me.getCurr(),
                        callback: function(records, operation, success){
                            box.setValue(store.getAt(0));
                        }
                    });
                }
            },
            '#SourceManager #CubeBox':{
                change: function(combo, newValue, oldValue, eOpts){
                    var grid = me.getCubeDimensionsGrid();
                    var store = grid.store;
                    store.load({
                        params: me.getCurr(),
                        callback: function(records, operation, success){
                            grid.getView().getSelectionModel().select(records[0]);
                        }
                    });
                }
            },
            '#SourceManager #CubeDimensionsGrid':{
                select: function ( grid, record, eOpts ) {
                    console.log('cubedimension selected');
                    var tree = me.getElementsTree();
                    var store = tree.store;
                    var c = me.getCurr();
                    c.dimension = record.data.abbr;
                    store.load({
                        params: c,
                        callback: function(records, operation, success){
                            //  do nothing
                        }
                    });
                }
            },
            '#SourceManager #SourceTypeBox':{
                change: function(combo, newValue, oldValue, eOpts){
                    var ElementsTree = me.getElementsTree();
                    var ElementsTreeStore = ElementsTree.store;
                    var abbr = combo.findRecordByValue(newValue).data.abbr;
                    switch (abbr){
                        case 'value':
                            me.multiselect = false;
                            ElementsTreeStore.load({
                                params: me.getCurr()
                            });
                            break;
                        case 'values':
                        case 'area':
                            me.multiselect = true;
                            ElementsTreeStore.load({
                                params: me.getCurr()
                            });
                            break;
                    }
                },
                render: function(combo, eOpts){
                    combo.setValue(combo.store.getAt(1));
                }
            },
            '#SourceManager #DumpButton':{
                click: function(button, e, eOpts){
                    var CubeDimensionsStore = me.getCubeDimensionsGrid().store;
                    var SourceNameField = me.getSourceNameField();
                    var CoordStore = me.getCoordGrid().store;
                    var eM = [];
                    CubeDimensionsStore.each(function(record){
                        var val = record.data.value;
                        if (val.length === 0){
                             Ext.create('Olap.view.common.Notification', {
                                title: 'Ошибка',
                                html: 'Элемент `'+record.data.abbr+'` не содержит значения'
                            }).show(); 
                            return false;
                        }else{
                            eM.push(val.split(','));
                        }
                        console.log(val);
                        
                    });
                    
                    var c = me.getCurr();
                    var name = SourceNameField.getValue();
                    var m = {
                        name: name,
                        database: c.database,
                        cube: c.cube,
                        paths: JSON.stringify(_.cartesianProductOfArray(eM))
                    };
                    CoordStore.add(m);
                }
            },
            '#SourceManager #ElementsTree':{
                checkchange: function( node, checked, eOpts ) {
                    var tree = me.getElementsTree();
                    var records = tree.getChecked(),
                        names = [],
                        elements = [];
                               
                    Ext.Array.each(records, function(rec){
                        names.push(rec.get('text'));
                        elements.push(rec.raw.element);
                        //console.log(rec);
                    });
                    
                    var DimRec = me.getCubeDimensionsGrid().getView().getSelectionModel().getSelection()[0];
                    

                    DimRec.set('valueText',names.join(','));
                    DimRec.set('value',elements.join(','));

                    console.log(names.join(','));
                    console.log(elements);
                },
                selectionchange: function(selectionModel, selected, eOpts) {
                    
                },
                select: function( selectionModel, record, index, eOpts ){
                    
                }
            },
            '#SourceManager #CoordGrid #RemoveButton':{
                click: function(button, e, eOpts){
                    var grid = me.getCoordGrid();
                    grid.store.remove(grid.getView().getSelectionModel().getSelection( ));
                }
            },
            '#SourceManager #CoordGrid #ReceiveValueButton':{
                click: function(button, e, eOpts){
                    var item = me.getCoordGrid().getView().getSelectionModel().getSelection()[0];
                    console.log(item.data);
                    var obj = item.data;
                    var query = {
                        database: obj.database,
                        cube: obj.cube,
                        paths: JSON.parse(obj.paths).join(':')
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
            }
        });
    },
    refs:[{
        ref: 'DatabaseBox',
        selector: '#SourceManager #DatabaseBox'
    },{
        ref: 'CubeBox',
        selector: '#SourceManager #CubeBox'
    },{
        ref: 'CubeDimensionsGrid',
        selector: '#SourceManager #CubeDimensionsGrid'
    },{
        ref: 'ElementsTree',
        selector: '#SourceManager #ElementsTree'
    },{
        ref: 'SourceTypeBox',
        selector: '#SourceManager #SourceTypeBox'
    },{
        ref: 'SourceNameField',
        selector: '#SourceManager #SourceNameField'
    },{
        ref: 'CoordGrid',
        selector: '#SourceManager #CoordGrid'
    }]
});