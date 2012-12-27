var http = require("http");
var host = 'ya.ru';
//var 

exports.palo = {
    host: 'ya.ru',
    port: '',
    server : {
        databases : function(){
            return 0;
        },
        info: function(){
            
        },
        load:function(){
            
        },
        login: function(){
            var result;
            http.get({
                    host: host,
                    path: '/server/login?user='+'user'+'&extern_password='+'password',
                    },function(res){
                        result = res;
            }).on('error', function(e) {
                result = e;
            });
            return result;
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
