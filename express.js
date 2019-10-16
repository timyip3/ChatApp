var express = require('express');

var app = express();

var http = require('http');
var server = http.createServer(app); 
var io = require('socket.io').listen(server);

server.listen(3000, () => {
  console.log('server is running on port', server.address().port);

});

app.use(express.static(__dirname + '/public'));
app.use('/angular', express.static(__dirname + '/node_modules/angular'));

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
	req.io = io;
	next();
});
app.use(require('./routes/routes'));
//socket io
io.on('connection', () => {
  console.log('a user is connected');
});

