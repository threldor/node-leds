
/**
 * Node-Serial
 * Author : Stephen Braitsch
 */

var express = require('express')
  , http = require('http')
  , port = require('./modules/serial_node')
  , socket = require('./modules/socket_server');

var app = express();

app.configure(function(){
	app.set('port', 8080);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.locals.pretty = true;
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'super-duper-secret-secret' }));
	app.use(express.methodOverride());
	app.use(require("stylus").middleware({
		compress: true,
		src: __dirname + "/public"
	}));
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

/* ROUTES */

app.get('/', function(req, res){
	res.render('index');
});

/* start the node server & initialize socket-io */
var server = http.createServer(app).listen(app.get('port'), function(){
	socket.init(require('socket.io').listen(server));
	console.log("Express server listening at", server.address());
});