var Ext = Ext || {};

Ext.define('Olap.view.common.List',{
    extend: 'Ext.grid.Panel',
    selType: 'rowmodel',
    listeners: {
        itemcontextmenu: function ( treePanel, record, item, index, e, eOpts ){
            e.preventDefault();
            if (this.itemcontextmenupanel===undefined){
                this.itemcontextmenupanel = new Ext.menu.Menu({
                    items: this.itemcontextmenu
                });
            }
            this.itemcontextmenupanel.selecteditem = record;
            this.itemcontextmenupanel.showAt(e.getXY());
            
        },
        render: function(){
            this.store.load();
        }/*,
        render:function(){
            var _this=this;            
            window.OlapNavigator.on('Olap.view.User.List.Update',function(){
                _this.store.load();
            });
        }*/
    },
    initComponent: function(){
        var me = this;
        me.plugins = [
            Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1,
            listeners: {
                beforeedit: function() {
                    //me.store.sync();                        
                    me.store.resumeAutoSync();
                }
            }
        })
        ];
        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            store: me.store
        }];
        this.callParent();
    }
});

