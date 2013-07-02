var Ext = Ext || {};
Ext.define('Olap.view.sources.Elements', {
    extend: 'Ext.tree.Panel',
    
    rootVisible: false,
    //useArrows: true,
//    frame: true,
    initComponent: function(){
        Ext.apply(this, {
            tbar: [{
                text: 'Get checked nodes',
                scope: this,
                handler: this.onCheckedNodesClick
            }]
        });
        this.callParent();
    },
    
    onCheckedNodesClick: function(){
        var records = this.getView().getChecked(),
            names = [];
                   
        Ext.Array.each(records, function(rec){
            names.push(rec.get('text'));
        });
                    
        Ext.MessageBox.show({
            title: 'Selected Nodes',
            msg: names.join('<br />'),
            icon: Ext.MessageBox.INFO
        });
    }
})