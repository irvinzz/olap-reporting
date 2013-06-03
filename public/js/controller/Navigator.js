var Ext = Ext || {};
Ext.define('Olap.controller.Navigator', {
    id: 'olapControllerNavigator',
    extend: 'Ext.app.Controller',
    someMagicCast: function(element, options) {
        function someMagicCastSub() {
            switch (element) {
            case 'Olap.view.User.Edit':
                if (options.Data !== undefined) {
                    return {
                        Data: options.Data,
                        method: 'PUT',
                        url: '/user/' + options.Data.id
                    };
                } else {
                    return {
                        method: 'POST',
                        url: '/user'
                    };
                }
                break;
            case 'Olap.view.Palo.Servers.Edit': 
                if (options.Data !== undefined) {
                    return {
                        Data: options.Data,
                        method: 'PUT',
                        url: '/palo/servers/' + options.Data.id
                    };
                } else {
                    return {
                        method: 'POST',
                        url: '/palo/servers'
                    };
                }
                break;
            default:
                return {};
            }
        }
        options = options || {};
        var g = someMagicCastSub(element, options);
        return this.extender(options,g);
    },
    extender: function(target, source) {
        for (var i in source) target[i] = source[i];
        return target;
    },
    init: function(){
        /*var mf = Ext.ComponentQuery.query('#MainFrame');
        console.log(mf);*/
        this.control({
            '#Navigator': {
                'Olap.view.Navigator.onSelect':function(entryId) {
                    this.navigateTo(entryId);
                },
                'Olap.view.Navigator.Navigate':function(eOpts) {
                    this.navigateTo(eOpts[0],this.someMagicCast(eOpts[0],eOpts[1]));
                },
                'Olap.controller.User.Delete':function(Data) {
                    Ext.Msg.confirm( 'Удаление пользователя', 'Вы действительно хотите удалить пользователя '+Data.name+' ('+Data.id+')', function(e) {
                        if (e==='yes'){
                            var erase = Data.deleted === true;
                            if (!erase) {
                                Ext.Ajax.request({
                                    url: '/user/'+Data.id,
                                    params: {
                                        deleted: true
                                    },
                                    method: 'PUT',
                                    success: function(response){
                                        if (response.status===200) {
                                            window.OlapNavigator.fireEvent('Olap.view.User.List.Update');
                                        }
                                    }
                                });
                            } else {
                                Ext.Ajax.request({
                                    url: '/user/'+Data.id,
                                    method: 'DELETE',
                                    success: function(response){
                                        if (response.status===200){
                                            window.OlapNavigator.fireEvent('Olap.view.User.List.Update');
                                        }
                                    }
                                });
                            }
                        }
                    }) ;
                }
            }
        });
    },
    __indexes: {},
    elements: {},
    navigateTo: function(cmp, options, autoactivate) {
        options = options || {};
        var _this = this;
        //  TODO: contains some bugs
        //  TODO: tabs with multi instances
        var mf = Ext.ComponentQuery.query('#MainFrame')[0];
        //  trying to get element from store
        var lastId = (this.__indexes[cmp+':lastId'] || 0);
        var item = this.elements[cmp+'#'+lastId];
        if (item === undefined) {
            var crOpts = {
                closable: true,
                elementKey: cmp+'#'+lastId,
                tabBar: {
                    menu: [{
                            text: 'regular item 1'
                        },{
                            text: 'regular item 2'
                        },{
                            text: 'regular item 3'
                        }]

                }
            };
            item = Ext.create(cmp, this.extender(options,crOpts));
            if (item.singleInstance === true){
                item.addListener('beforeclose', function(panel, eOpts) {
                    //  hiding tab
                    panel.hide();
                    //  hiding tab header
                    panel.tab.hide();
                    if (mf.items.items.length>0) mf.setActiveTab(mf.items.items[0]);
                    //  cancel closing
                    return false;
                });
            } else {
                this.__indexes[cmp+':lastId'] = lastId + 1;
            }
            //  if tab closed, delete from storage "elements"
            item.addListener('close', function(panel,eOpts) {
                delete _this.elements[panel.elementKey];
            });
            this.elements[cmp+'#'+lastId] = item;
            mf.add(item);
        } else {
            // if item exists just show it
            item.show();
            item.tab.show();
        }
        if (autoactivate !== false) {
            mf.setActiveTab(item);
        }
    },
    instance: function() {
        
    }
});