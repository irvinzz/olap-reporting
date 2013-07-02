#!/home/cloud9/opt/node-v0.10.9-linux-x64/bin/node
/**
 * Module dependencies.
 */
require(__dirname+'/controllers/etlclient.js');
var express = require('express')
  , io = require('socket.io')
  , routes = require('./routes')
  , dbCtrl = require('./controllers/dbcontroller')
  , index = require('./routes/index')
  , RedisStore = require('connect-redis')(express)  
  , http = require('http')
  , path = require('path')
  , nconf = require('./init/nconf')()
  , expressController = require('express-controller')
  , passport = require('./init/passport')()
  , phpExpress = require('php-express')({
        binPath: '/usr/bin/php' // php bin path.
  })
  , paloClient = require('./controllers/libs')
  ;

var app = express();

app.configure(function(){
  //app.set('port', process.env.PORT || 3000);
  app.set('port', 3003);
  app.set('views', __dirname + '/views');
  app.engine('php', phpExpress.engine);
  app.set('view engine', 'jade');
  app.use(express.compress());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  //app.use(express.session());
  //var sessionStore = new express.session.MemoryStore();
  app.use(express.session({
    secret: '070a897b383496ab48113192a676591b',
    store: new RedisStore({
        db: 2
    })
  }));
  /*app.use(
      express.cookieSession({
          secret: '3c96a2785f5518253103023230e0d23e',
          store: sessionStore,
          cookie: {
              maxAge: 3600*1000 // 1 hour
          }
      }
    )
  );*/
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req,res,next){
      paloClient.getGlobalClient({},function(err,result){
          if (!err){
              req.paloClient = result;
              next();
          }else{
              res.send('could not connect to palo database with error: '+err+' / '+JSON.stringify(result));
          }
      });
      
  });
  app.use(app.router);    
});

//return passport;

app.configure('development', function(){
  app.use(express.errorHandler());
});
/*
app.map = function(path,mapper){
    this.all(path,function(req,res){
        var m = mapper({
                body: req.body,
                params: req.params,
                session: req.session,
                query: req.query,
                req: req
            });
        var p = m[req.method];
        if (p!==undefined)
            p(function(err,result){
                res.json(err || 200,result);
            });
        else
            res.send(405,'Method Not Allowed');
    });
};
*/
app.get('/', routes.index);
//app.get('/login',index.login);
app.get('/palo/:entry/:request',paloClient.getClientWrap,index.api);    //  closed api
//app.get('/adminUI',index.adminUI);
/*app.get('/login',function(req,res){
    res.redirect('/');
});*/
/*app.map('/palo/servers',dbCtrl.paloserversctrl);
app.map('/palo/servers/:id',dbCtrl.paloserversctrl);
app.map('/palo/databases',dbCtrl.palodatabasesctrl);
app.map('/user/:id',dbCtrl.userctrl);
app.map('/user',dbCtrl.userctrl);*/
app.all("*",function(req,res,next){
    console.log(req.method);
    next();
});
app.all(/.+\.php$/,function(req,res,next){
    res.header('X-Powered-By',res._headers['x-powered-by'] + ' ' + 'PHP/5.4.4-14');
    next();
});
app.all(/.+\.php$/, phpExpress.router);
app.get('socket.io/socket.io.js',function(req,res,next){
    res.header('Last-Modified','Thu, 06 Jun 2013 15:50:20 GMT');
});

app.all('/api/palo/*',paloClient.getClientWrap);

expressController.bind(app,{
    directory: __dirname+'/controllers',
    base: '/api/'
});

app.get('/ch',function(req,res){
    res.send(req.session);
});

app.get('/resources/data/tree/check-nodes.json', function(req, res) {
    res.json([{
        "text": "To Do",
        "cls": "folder",
        "expanded": true,
        checked: false,
        "children": [{
            "text": "Go jogging",
            "leaf": true
        }, {
            "text": "Take a nap",
            "leaf": true,
            "checked": false
        }, {
            "text": "Climb Everest",
            "leaf": true,
            "checked": false
        }]
    }, {
        "text": "Grocery List",
        "cls": "folder",
        "children": [{
            "text": "Bananas",
            "leaf": true,
            "checked": false
        }, {
            "text": "Milk",
            "leaf": true,
            "checked": false
        }, {
            "text": "Cereal",
            "leaf": true,
            "checked": false
        }, {
            "text": "Energy foods",
            "cls": "folder",
            "children": [{
                "text": "Coffee",
                "leaf": true,
                "checked": false
            }, {
                "text": "Red Bull",
                "leaf": true,
                "checked": false
            }]
        }]
    }, {
        "text": "Remodel Project",
        "cls": "folder",
        "checked": false,
        "children": [{
            "text": "Finish the budget",
            "leaf": true,
            "checked": false
        }, {
            "text": "Call contractors",
            "leaf": true,
            "checked": false
        }, {
            "text": "Choose design",
            "leaf": true,
            "checked": false
        }]
    }]);
});

var socketCollection = {};
var si=0;
(function(){
    var httpd = http.createServer(app);
    io = io.listen(httpd);
    httpd.listen(app.get('port'), function(){
      console.log("Express server listening on port " + app.get('port'));
    });
    io.sockets.on('connection', function (socket) {
        socketCollection[socket.store.id] = socket;
        socket.on('my other event', function (data) {
            console.log(data);
        });
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
}());

