var http = require("http");
var host = 'ya.ru';
//var 
function palo_http_get(path,parameters,results,callback){
    var r='';
    var p='>';
    for (var i in parameters){
        console.log(i);
    }
    
    
    for (var i = 0; i < parameters.length; i++) {
        if (i!==0){
            p+='&';
        }
        var key = parameters[i].name;
        console.log(key+' > '+parameters[key]);
        r+=key+'='+parameters[key];
    }
    if (p!==''){
        p='?'+p;
    }
    console.log(parameters);
    console.log(p);
    http.get({
        host:host,
        path:path
    },function(res){
        res.on('error',function(e){
            callback(e);
        });
        res.on('data',function(c){
            r+=c;
        });
        res.on('end',function(){
            r=r.split(';');
            var r2={};
            for (var i = 0; i < results.length; i++) {
                r2[results[i]]=r[i];
            }
            callback(r2);
        });
    });
}

exports.palo = {
    host: 'olap.rts-ugra.ru',
    port: '',
    sid: undefined,
    ttl: undefined,
    server : {
        databases : function(parameters,callback){
            palo_http_get(
                '/server/databases',
                parameters,
                [
                    'database',
                    'name_database',
                    'number_dimensions',
                    'number_cubes',
                    'status',
                    'type',
                    'database_token'
                ],
                callback);
        },
        info: function(){
            
        },
        load:function(){
            
        },
        login: function(login,password,callback){
            var r='';
            http.get({
                    host: host,
                    //path: '/server/login?user='+'user'+'&extern_password='+'password',
                    path: '/',
                    },function(res){
                        console.log('host: '+host);
                        res.on('error', function(e) {
                            return callback(e);
                        });
                        res.on('data',function(c) {
                            r+=c;
                        });
                        res.on('end',function(){
                            r = r.split(';');
                            r = {sid:r[0],ttl:r[1]};
                            sid = r.sid;
                            ttl = r.ttl;
                            callback(r);
                        });
                    }
            );
        },
        logout: function(){
            
        },
        save: function(){
            
        },
        shutdown: function(){
            
        }
    },
    database : {
        cubes: function(){
            
        },
        create: function(){
            
        },
        destroy: function(){
            
        },
        dimensions: function(){
            
        },
        info: function(){
            
        },
        load: function(){
            
        },
        rename: function(){
            
        },
        save: function(){
            
        },
        unload: function(){
            
        }
    },
    dimension : {
        clear: function(){
            
        },
        create: function(){
            
        },
        cubes: function(){
            
        },
        destroy: function(){
            
        },
        element: function(){
            
        },
        elements: function(){
            
        },
        info: function(){
            
        },
        rename: function(){
            
        },
    },
    element : {
        append: function(){ // Adds children to consolidated elements.     dimension
            
        },
        create: function(){ // Creates new element.     dimension
            
        },
        create_bulk: function(){ // Creates multiple elements of the same type.     dimension
            
        },
        destroy: function(){ // Deletes an element.     dimension
            
        },
        destroy_bulk: function(){ // Delete list of elements.     dimension
            
        },
        info: function(){ // Shows identifer, name, position, level, depth, parents and children of an element.     dimension
            
        },
        move: function(){ // Changes position of an element.     dimension
            
        },
        rename: function(){ // Renames an element.     dimension
            
        },
        replace: function(){ // Changes or creates a new element. Replaces children in consolidated elements.     dimension
            
        },
        replace_bulk: function(){
            
        },
    },
    cube : {
        clear: function(){
            
        },
        commit: function(){
            
        },
        create: function(){
            
        },
        convert: function(){
            
        },
        destroy: function(){
            
        },
        info: function(){
            
        },
        load: function(){
            
        },
        lock: function(){
            
        },
        locks: function(){
            
        },
        rename: function(){
            
        },
        rollback: function(){
            
        },
        rules: function(){
            
        },
        save: function(){
            
        },
        unload: function(){
            
        },
    },
    cell : {
        area: function(){
            
        },
        copy: function(){
            
        },
        drillthrough: function(){
            
        },
        export: function(){
            
        },
        goalseek: function(){
            
        },
        replace: function(){
            
        },
        replace_bulk: function(){
            
        },
        value: function(){
            
        },
        values: function(){
            
        },
    },
    event : {
        begin: function(){
            
        },
        end: function(){
            
        },
    },
    rule : {
        create: function(){
            
        },
        destroy: function(){
            
        },
        functions: function(){
            
        },
        info: function(){
            
        },
        modify: function(){
            
        },
        parse: function(){
            
        },
    },
    svs : {
        info: function(){
            
        }
    },
};
