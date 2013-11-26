var Ext = Ext || {};

function getRandVal(dict,len){
    var d = (dict || '0123456789abcdef').split('');
    var l = len || 8;
    var r = '_var';
    for (var i=0;i<l;i++){
        var c = Math.round(Math.random() * d.length);
        r+=d[c];
    }
    return r;
}

Ext.define('Olap.controller.TemplateManager',{
    extend: 'Ext.app.Controller',
    init: function(){
        var me = this;
        
        /*me.getVariablesTable().itemcontextmenupanel.addListener('deleting',function(){
            console.log('deleting');
        });*/
        
        this.control({
            '#OlapViewTemplatesManager #saveTemplateBtn':{
                'click': function(){
                }
            },
            '#OlapViewTemplatesManager #saveTemplateAsNewBtn':{
                'click':function(){
                    var tlb = me.getTemplatesListBox();
                    var store = tlb.store;
                    var value = tlb.getValue();
                    var rec = store.getById(value);
                    if (rec===null){
                        //  create new one
                        store.add({
                            name: (value!=='' ? value : getRandVal()),
                            text: me.getEditor().getValue()
                        });
                    }else{
                        // update existing
                        //rec.set()
                        rec.set('name',rec.data.name);
                        rec.set('text', me.getEditor().getValue());
                        //rec.save();
                    }
                    return console.log('saved');
                    /*console.log(rec);
                    return console.log(tlb.getValue());
                    var rec = store.getById(tlb.getValue( ));
                    var store = tlb.store;
                    return console.log(tlb.getValue());
                    
                    
                    
                    var name = rec.data.name;
                    console.log(name);
                    if (!!name){
                        store.add({
                            name: name,
                            content: me.getEditor().getValue()
                        });
                    }else{
                        Ext.msg.Alert('Ошибка','Не указано имя шаблона');
                    }*/
                }
            },
            '#OlapViewTemplatesManager #Toolbar #insertVariable':{
                'click':function(){
                    var value = me.getVariableField().getValue();
                    value = (value !== '' ? value : getRandVal());
                    var editor = me.getEditor();
                    editor.insert(value);
                    
                    me.getVariablesTable().store.suspendAutoSync();
                    me.getVariablesTable().store.add({
                        name: value,
                        template: me.getTemplatesListBox().getValue()
                    });
                }
            },
            '#OlapViewTemplatesManager #TemplatesBox':{
                'render': function(){
                    var tlb = me.getTemplatesListBox();
                    console.log('store');
                    console.log(tlb);
                },
                'change': function( box, newValue, oldValue, eOpts ){
                    var rec = box.store.getById(newValue);
                    if (rec===null){
                    }else{
                        var text = rec.data.text;
                        me.getEditor().setValue(text);
                        me.getVariablesTable().store.proxy.setExtraParam('template',rec.data._id);
                        me.getVariablesTable().store.load();
                    }
                }
            },
            "#OlapViewTemplatesManager #Toolbar #deleteTemplateBtn":{
                'click':function(){
                    var tlb = me.getTemplatesListBox();
                    var id = tlb.getValue( );
                    console.log(id);
                    tlb.store.remove(tlb.store.getById(id));
                }
            },
            '#OlapViewTemplatesManager #Toolbar #previewBtn':{
                'click':function(){
                    var tlb = me.getTemplatesListBox();
                    var id = tlb.getValue( );
                    window.open('/api/reports/'+id);
                }
            },
            '#OlapViewTemplatesManager #VariablesTable':{
                'menuitemclicked': function(){
                    console.log('menuitem clicked');
                },
                'deleting': function(){
                    console.log('deleting');
                },
                'itemcontextmenu': function(){
                    console.log('menuing');
                }
            },
            '#menu_VariablesTable':{
                'click': function(){
                    console.log('bingo 3');
                }
            },
            '#menu_VariablesTable #deleteMenuItem':{
                'click': function(item,e){
                    var listItem = item.up().selecteditem;
                    if (listItem!==null){
                        var store = me.getVariablesTable().store;
                        Ext.MessageBox.confirm('Confirm','Are You Sure',function(btn){
                            if (btn==='yes'){
                                store.remove(listItem);
                            }
                        });
                    }
                }
            }
        });
    },
    refs:[{
        ref: 'Editor',
        selector: '#OlapViewTemplatesManager #jadeeditor',
    },{
        ref: 'Toolbar',
        selector: '#OlapViewTemplatesManager #Toolbar'
    },{
        ref: 'TemplatesListBox',
        selector: '#OlapViewTemplatesManager #Toolbar #TemplatesBox'
    },{
        ref:'CoordinatesBox',
        selector: '#OlapViewTemplatesManager #Toolbar #CoordinatesBox'
    },{
        ref: 'Mapper',
        selector: '#OlapViewTemplatesManager #Binds'
    },{
        ref: 'VariableField',
        selector: '#OlapViewTemplatesManager #VariableField'
    },{
        ref: 'VariablesTable',
        selector: '#OlapViewTemplatesManager #VariablesTable'
    }]
});


















































