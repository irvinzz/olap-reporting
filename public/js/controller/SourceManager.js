var Ext = Ext || {};
var _ = _ || {};

Ext.define('Olap.controller.SourceManager',{
    extend: 'Ext.app.Controller',
    getCurr: function(){
        var r = {};
        var srvbox = this.getServerBox();
        console.log(srvbox);
        var dbbox = this.getDatabaseBox();
        var cubebox = this.getCubeBox();
        var cubedimensionsgrid = this.getCubeDimensionsGrid();
        try { r.server = srvbox.findRecordByValue(srvbox.getValue()).data.abbr; } catch(e) {}
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
            '#SourceManager #ServerBox':{
                render: function( combo, eOpts){
                    var box = combo;
                    var store = box.store;
                    store.load(function(){
                        box.setValue(store.getAt(0));
                    });
                },
                change: function(combo,newValue, oldValue, eOpts){
                    var nextBox = me.getDatabaseBox();
                    var store = nextBox.store;
                    store.load({
                        params: me.getCurr(),
                        callback: function(records, operation, success){
                            nextBox.setValue(store.getAt(0));
                        }
                    });
                }
            },
            '#SourceManager #DatabaseBox':{
                /*render: function(){
                    var box = me.getDatabaseBox();
                    var store = box.store;
                    store.load(function(){
                        box.setValue(store.getAt(0));
                    });
                },*/
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
                            Ext.Array.each(records,function(r, i, countriesItSelf) {
                                var store = Ext.create('Olap.store.Sources.Elements');
                                var c = me.getCurr();
                                c.dimension = r.data.abbr;
                                store.load({
                                    params: c,
                                    callback: function(records,operation,success){
                                        r.set('valueText',records[0].data.text);
                                        r.set('value',records[0].data.index);
                                    }
                                });
                            });
//                            grid.getView().getSelectionModel().select(records[0]);
                        }
                    });
                }
            },
            '#SourceManager #CubeDimensionsGrid':{
                select: function ( grid, record, eOpts ) {
                    var tree = me.getElementsTree();
                    var store = tree.store;
                    var c = me.getCurr();
                    c.dimension = record.data.abbr;
                    c.checked = record.get('value');
                    store.load({
                        params: c,
                        callback: function(records, operation, success){
                            console.log('it is here',store);
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
            '#SourceManager #AddButton':{
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
                    if (''===name){
                        Ext.create('Olap.view.common.Notification',{
                            title: 'Ошибка',
                            html: 'Не указан обязательный параметр "Имя"'
                        }).show();
                        return false;
                    }
                    var m = {
                        name: name,
                        server: c.server,
                        database: c.database,
                        cube: c.cube,
                        configure: JSON.stringify(eM),
                        //paths: JSON.stringify(_.cartesianProductOfArray(eM))
                        paths: JSON.stringify(eM)
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
                    var obj = item.data;
                    var query = {
                        server: obj.server,
                        database: obj.database,
                        cube: obj.cube,
                        paths: (_.cartesianProductOfArray(Ext.JSON.decode(obj.paths))).join(':')
                    };
                    Ext.Ajax.request({
                        method: 'GET',
                        url: '/api/palo/cell/values',
                        params: query,
                        success: function(response, opts){
                            var result = Ext.JSON.decode(response.responseText);
                            var results = [];
                            for (var i=0;i<result.rows.length;i++){
                                results.push({
                                    c: result.rows[i].coordinate,
                                    v: result.rows[i].value
                                });
                            }
                            Ext.Msg.alert('Ответ',results);
                            console.log(response,opts);
                        },
                        failure: function(response, opts){
                            console.log(response,opts);
                        }
                    });
                    console.log(obj);
                }
            },
            '#SourceManager #CoordGrid #DumpButton':{
                click: function(button, e, eOpts){
                    var item = me.getCoordGrid().getView().getSelectionModel().getSelection()[0];
                    console.log(item.data);
                }
            }
        });
    },
    refs:[{
        ref: 'ServerBox',
        selector: '#SourceManager #ServerBox'
    },{
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