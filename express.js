var express = require('express');

var app = express();

var http = require('http');
var server = http.createServer(app); 
var io = require('socket.io').listen(server);

server.listen(3000, () => {
  console.log('server is running on port', server.address().port);

});

app.use(express.static(__dirname + '/public'));

// database
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/ChatAppDB';


  mongoose.connect(dbUrl, {useNewUrlParser: true}).catch(err => console.log('error: mongodb cannot connect'));
  
var schema = new mongoose.Schema({name: String, message: String});
var Message = mongoose.model('Messages', schema);

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routing
app.get('/messages', (req, res) => {
  Message.find({}, (err, messages)=> {
    res.send(messages);
  })
});

app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if(err)
      res.sendStatus(500);
    res.sendStatus(200);
    io.emit('message', req.body);
  })
})

//socket io
io.on('connection', () => {
  console.log('a user is connected');
});

