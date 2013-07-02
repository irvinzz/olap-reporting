var Ext = Ext || {};

Ext.require([
]);

var Hasher = Hasher;

var mw;

Ext.define('Olap.controller.History',{
    extend: 'Ext.app.Controller',
    init: function(){
        Ext.History.init();
        Hasher.setup();
        /*__searcher(this.routes);
        function __searcher(root,path){
            if (path===undefined) path=[""];
            for(var i in root){
                var r = i.split('_');
                switch (typeof root[i]){
                    case 'function':
                        
                        var next = '';
                        for (var j=1;j<r.length;++j){
                            next+='/:'+r[j];
                        }
                        switch (r.length) {
                            case 0:
                            break;
                            case 1:
                            break;
                            case 2:
                            break;
                        }
                        var p = path.join('/')+'/'+r[0]+next;
                        console.log(p);
                        var _f = root[i];
                        Hasher.add(p,root[i]);
                    break;
                    case 'object':
                        path.push(r[0]);
                        __searcher(root[i],path);
                    break;
                }
            }    
        }*/
        Hasher.add(this.routes);
    },
    handler: function(){
        /*var token = Ext.History.getToken();
        console.log('history changed',token);
        var me = this;
        var _i = token.split('?');
        var search={};
        var searchstr = _i[1];
        var searchspl = searchstr.split('&');
        for (var i=0,l=searchspl.length;i<l;++i){
            var pair = searchspl[i].split('=');
            if (search[pair[0]]!==undefined){   //  if key is already exists
                if (typeof search[pair[0]] === 'string'){   //  after first hit, convert string to array
                    search[pair[0]] = [search[pair[0]],pair[1]];
                }else{                                      //  after any ather hit, just push to array
                    search[pair[0]].push(pair[1]);
                }
            }else{                              //  key is not defined yet
                search[pair[0]]=pair[1];
            }
        }
        var path = _i[0];
        var pathspl = path.split('/');
        if (pathspl[0]==='')
            pathspl = pathspl.slice(1);*/
    },
    routes:{
        '/': function(){
            if (mw!==undefined) mw.hide();
            //window.viewport.removeAll();
            Ext.Ajax.request({
                url: '/api/auth',
                method: 'GET',
                success: function(response, opts){
                    //var obj = Ext.decode(response.responseText);
                    //console.dir(obj);
                    Ext.History.add('/adminui');
                    //console.log('/adminui');
                },
                failure: function(){
                    Ext.History.add('/login');
                    //console.log('/login');
                }
            });
        },
        '/login': function(){
            Ext.create('Olap.view.Login', {
                renderTo: Ext.getBody(),
                closable: false
            }).show();
        },
        '/logout': function(){
            Ext.Ajax.request({
                url: '/api/auth',
                method: 'DELETE',
                success: function(form, action){
                    Ext.Msg.alert('Auth','U R Logged out',function(){
                        Ext.History.add('/');
                    });
                },
                failure: function(form,action){
                    Ext.Msg.alert('Auth','Cannot Logout');
                }
            });
        },
        '/name/:id': function(name, search){
            console.log('name > '+name);
            console.log('search > ',search);
        },
        '/adminui': function(){
            if (mw===undefined){
                mw = Ext.create('Olap.view.admin.MainWindow',{
                });
                window.viewport.add(mw);
            }
            mw.show();
        },
        '/folder/:id':function(id){
            
        },
        '/folder/mail/:id':function(id){
            console.log('folder > mail > '+id);
        },
        '/folder/s/path/:id':function(id){
            console.log('folder > s > path > '+id);
        },
        '/test/:x/:y':function(x, y, search){
            console.log('text > ' + x + ' > ' + y);
            console.log('search : ',search);
        }
        /*name_id: function(name){
            
        },
        adminui: function(){
            
        },
        folder_id: function(id){
            console.log('folder '+id);
        },
        folder: {
            mail_id: function(id){
                
            },
            s:{
                path_id: function(id){
                    
                }
            }
        }*/
    }
});






