var http = require("http");
var Class = require('node-class').Class;
var MD5 = require('MD5');

var paloClass = Class("PaloClass",{
    host : 'localhost',
    port : '',
    sid : undefined,
    ttl : undefined
});
paloClass.implements({
    __construct: function(){
        var c = this;
        this.server = new serverClass(c);
        this.database = new databaseClass(c);
        this.dimension = new dimensionClass(c);
        this.element = new elementClass(c);
        this.cube = new cubeClass(c);
        this.cell = new cellClass(c);
        this.event = new eventClass(c);
        this.rule = new ruleClass(c);
        this.svs = new svsClass(c);
    },
    hg: function (path,parameters,results,callback){
        var r='';
        var p='';
        var i=0;
        for (var k in parameters) {
            if (i!==0) p+='&';
            p+=k+'='+parameters[k];
            i++;
        }
        console.log('accessing to :'+path+'?'+p);
        http.get({
            host:this.host,
            port:this.port,
            path:path+'?'+p
        },onResponse);
        
        function onResponse(res){
            res.on('error',function(e){
                callback(e,e);
            });
            res.on('data',function(c){
                r+=c;
            });
            res.on('end',onEnd);
			
			function onEnd(){
				var headers = {
					"X-PALO-SV": res.headers["x-palo-sv"] || '',
					"X-PALO-DB": res.headers["x-palo-db"] || '',
					"X-PALO-DIM": res.headers["x-palo-dim"] || '',
					"X-PALO-CB": res.headers["x-palo-cb"] || '',
					"X-PALO-CC": res.headers["x-palo-cc"] || ''
				};
                if (res.statusCode===200){
                    var result=[];
                    var rs=r.split('\n');
                    for (var i=0;i<rs.length;i++){
                        if (rs[i]!==''){
                            var r1 = rs[i].split(';');
                            var r2 = {};
                            for (var j = 0; j < results.length; j++) {
                                r2[results[j]]=r1[j];
                            }
                            result.push(r2);
                        }
                    }
					callback(null,{
						headers: headers,
						result: result
					});
                }else{
                    callback(res.statusCode,r);
                }
			}
        }
    }
});

exports.paloServers = [];

exports.paloClass = paloClass;

var paloSubClass = Class("PaloSubClass",{
});
paloSubClass.implements({
    __construct: function (p){
        this.palo = p;
    }
});

var serverClass = Class("ServerClass",{
});
serverClass.extends(paloSubClass,false);
serverClass.implements({
    _sR: function(params,diff,callback){
        this.palo.hg(
            '/server/'+diff.f,
            params,
            diff.k,
            callback
        );
    },
    databases : function(params,callback){
        this._sR(
            params,
            {
                f: 'databases',
                k: [
                    'database',
                    'name_database',
                    'number_dimensions',
                    'number_cubes',
                    'status',
                    'type',
                    'database_token',
                ]
            },
            callback
        );
    },
    info: function(p,c){
        this._sR(
            null,
            {
                f:'info',
                k:['major_version','minor_version','bugfix_version','build_number','encryption','https_port']
            },
            c
        );
    },
    load:function(p,c){
        this._sR(p,{f: 'load',k: ['OK']},c);
    },
    login: function(p,c){
        var _this=this;
        this._sR(p,{f: 'login',k: ['sid','ttl']},function(err,result){
            if (!err){
                _this.palo.sid = result.sid;
                _this.palo.ttl = result.ttl;
            }
            c(err,result);
        });
    },
    logout: function(p,c){
		var _this = this;
        this._sR(p,{f: 'logout',k: ['OK']},function(err,result){
			if (!err){
				_this.palo.sid = null;
				_this.palo.ttl = null;
			}
			c(err,result);
		});
    },
    save: function(p,c){
        this._sR(p,{f:'save',k:['OK']},c);
    },
    shutdown: function(p,c){
        
    }
});

var databaseClass = Class("DatabaseClass",{
    
});
databaseClass.extends(paloSubClass,false);
databaseClass.implements({
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
});

var dimensionClass = Class("DimensionClass",{
    
});
dimensionClass.extends(paloSubClass,false);
dimensionClass.implements({
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
});

var elementClass = Class("ElementClass",{
    
});
elementClass.extends(paloSubClass,false);
elementClass.implements({
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
});

var cubeClass = Class("CubeClass",{
    
});
cubeClass.extends(paloSubClass,false);
cubeClass.implements({
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
})

var cellClass = Class("CellClass",{
    
});
cellClass.extends(paloSubClass,false);
cellClass.implements({
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
})

var eventClass = Class("EventClass",{
    
});
eventClass.extends(paloSubClass,false);
eventClass.implements({
    begin: function(){
        
    },
    end: function(){
        
    },
});

var ruleClass = Class("RuleClass",{
    
});
ruleClass.extends(paloSubClass,false);
ruleClass.implements({
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
})

var svsClass = Class("SvsClass",{
    
});
svsClass.extends(paloSubClass,false);
svsClass.implements({
    info: function(){
            
    }
});

