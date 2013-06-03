var on = function(){
    console.log('on construct');
}
on.prototype.a = function(){
    console.log('a');
}
on.prototype.xon = function(){
    console.log(this.y);
    console.log(this);
}

var two = function(){
    this.y = 5;
    console.log('two construct');
}
two.prototype = new on();
two.prototype.x = 4;

//var t = new two();
//t.xon();