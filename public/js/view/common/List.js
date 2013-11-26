var Ext = Ext || {};

Ext.define('Olap.view.common.List',{
    extend: 'Ext.grid.Panel',
    selType: 'rowmodel',
    listeners: {
        render: function(){
            var me = this;
            this.addListener('itemcontextmenu',function ( treePanel, record, item, index, e, eOpts ){
                console.log('treepanel',treePanel);
                console.log('this',me);
                e.preventDefault();
                if (me.itemcontextmenupanel===undefined){
                    me.itemcontextmenupanel = new Ext.menu.Menu({
                        itemId: 'menu_'+me.getItemId( ),
                        //itemId: 'menu_kjniuqwq923',
                        items: me.itemcontextmenu,
                        /*dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [{
                                //text: 'Docked to the top',
                                icon: '/img/icons/brick.png'
                            }]
                        }]*/
                    });
                    console.log(me.itemcontextmenupanel);
                }
                me.itemcontextmenupanel.selecteditem = record;
                me.itemcontextmenupanel.showAt(e.getXY());
                me.itemcontextmenupanel.addListener('click',function(menu, item, e, eOpts){
                    me.fireEvent('menuitemclicked');
                });
            });
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
                beforeedit: function(editor, context, eOpts) {
                    console.log(editor);
                    console.log(context);
                    console.log(eOpts);
                    //me.store.sync();                        
                    me.store.resumeAutoSync();
                },
                edit: function( editor, context, eOpts ){
                    console.log(editor,context,eOpts);
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

