var Ext = Ext || {};

Ext.define('Olap.controller.ReportsManager',{
    extend: 'Ext.app.Controller',
    init: function(){
        var me = this;
        me.control({
            '#OlapViewReportsManager #Toolbar #saveReportBtn':{
                'click': function(){
                    var val = me.getReportsBox().getValue();
                    var tpl = me.getTemplatesBox().getValue();
                    var store = me.getReportsBox().store;
                    var rec = store.getById(val);
                    if (rec===null){
                        console.log('creating new one');
                        store.add({
                            name: val,
                            template: tpl,
                        });
                    }else{
                        rec.set('name',val);
                        rec.set('template',tpl);
                        rec.save();
                    }
                    
                }
            },
            '#OlapViewReportsManager #Toolbar #ReportsBox': {
                'change': function(box, newValue, oldValue, eOpts){
                    var store = box.store;
                    var rec = store.getById(newValue);
                    if (rec!==null){
                        var template = rec.get('template');
                        me.getTemplatesBox().setValue(template);    
                        
                        me.getBindsTable().store.proxy.setExtraParam('report',newValue);
                        me.getBindsTable().store.load();
                    }
                    /*
                    me.getBindsTable().switchObject(rec.get('_id'));
                    me.getBindsTable().store.load();
                    me.getBindsTable().variablesEditor.store.proxy.url = '/api/templates/'+template+'/variables';
                    me.getBindsTable().variablesEditor.store.load();*/
                }
            },
            '#OlapViewReportsManager #addBind':{
                'click': function(){
                    me.getBindsTable().store.suspendAutoSync( );
                    me.getBindsTable().store.add({
                        variable: '',
                        link: '',
                        report: me.getReportsBox().getValue()
                    });
                }
            },
            "#OlapViewReportsManager #TemplatesBox":{
                'change': function(box, newValue, oldValue, eOpts){
                    
                    
                    me.getBindsTable().variablesEditor.store.proxy.setExtraParam('template',newValue);
                    me.getBindsTable().variablesEditor.store.load();
                }
            },
            '#OlapViewReportsManager #Toolbar #previewBtn':{
                'click': function(){
                    var report = me.getReportsBox().getValue();
                    window.open('/api/reports/'+report+'/render');
                }
            },
            '#OlapViewReportsManager #Toolbar #previewPDFBtn':{
                'click': function(){
                    var report = me.getReportsBox().getValue();
                    window.open('/api/reports/'+report+'/render/pdf');
                }
            }
        });
    },
    refs:[{
        ref: 'OlapViewReportsManager',
        selector: '#OlapViewReportsManager'
    },{
        ref: 'ReportsBox',
        selector: '#OlapViewReportsManager #Toolbar #ReportsBox'
    },{
        ref: 'TemplatesBox',
        selector: '#OlapViewReportsManager #TemplatesBox'
    },{
        ref: 'BindsTable',
        selector: '#OlapViewReportsManager #BindsTable'
    }]
});






























