/**
 * Module dependencies.
 */
require(__dirname+'/controllers/etlclient.js');
var express = require('express')
  , io = require('socket.io')
  , routes = require('./routes')
  , dbCtrl = require('./controllers/dbcontroller')
  , index = require('./routes/index')
  , http = require('http')
  , path = require('path')
  , nconf = require('nconf')
  , expressController = require('express-controller')
  , passport = require('./init/passport')()
  ;

nconf.env().file({file: 'config.json'});

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  //app.use(express.session());
  var sessionStore = new express.session.MemoryStore();
  app.use(
      express.cookieSession({
          secret: '3c96a2785f5518253103023230e0d23e',
          store: sessionStore,
          cookie: {
              maxAge: 3600*1000 // 1 hour
          }
      }
    )
  );
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express['static'](path.join(__dirname, 'public')));
  app.use(passport.initialize());
  app.use(passport.session());
    
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

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

app.get('/', routes.index);
app.get('/login',index.login);
app.get('/api/:entry/:request',index.api);
app.get('/adminUI',index.adminUI);
app.map('/palo/servers',dbCtrl.paloserversctrl);
app.map('/palo/databases',dbCtrl.palodatabasesctrl);
app.map('/user/:id',dbCtrl.userctrl);
app.map('/user',dbCtrl.userctrl);

expressController.bind(app,{
    directory: __dirname+'/controllers',
    base: '/ctrl/'
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
        var x=0;
        /*(function anon(){
            socket.emit(
                'news',
                {
                    hello: ++x,
                    id: socket.store.id
                }
            );
            setTimeout(anon, 1000);
        }());*/
        
        console.log('socket id: '+ si++);
        console.log('connection');
        socket.on('my other event', function (data) {
            console.log(data);
        });
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
}());

