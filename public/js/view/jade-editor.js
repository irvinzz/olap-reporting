var Ext = Ext || {};
var ace = window.ace;

Ext.define('Olap.view.jade-editor', {
    extend: 'Ext.container.Container',
    getValue: function(){
        return this.editor.getSession().doc.getValue();
    },
    setValue: function(data){
        this.editor.getSession().doc.setValue(data);
    },
    insert: function(data){
        var s = this.editor.getSession();
        s.insert(data);
        var val = '#{palosource_'+data+'}';
        this.editor.getSession().doc.insert(this.editor.getCursorPosition(),val);
    },
    listeners:{
        'render':function(ed, eOpts){
            var me = ed;
            var editor = ace.edit(me.id);
            editor.getSession().setTabSize(2);
            editor.setTheme("ace/theme/vibrant_ink");
            //editor.setTheme("ace/theme/textmate");
            editor.getSession().setMode("ace/mode/jade");
            me.editor = editor;
        }
    }
});
