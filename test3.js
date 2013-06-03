var util = require('util');
/*var http = require('http');

http.request('http://olap.rts-ugra.ru:7921/',function(res){
    res.on('error',function(err){
        console.log(err);
    });
});*/
/*Math.somefunc = function(a){return a*a;};
//console.log(typeof(Math.round));
for (var i in Math){
    console.log(Math[i](2));
}*/

var types = ['0',new Date()];

for (var i = 0, l=types.length; i<l; ++i){
    console.log(util.inspect(types[i]));
}
/*
var x = new Array(3);
console.log(x);*/