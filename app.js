var express = require('express');
var socket = require('socket.io');

//set port 
var port = process.env.PORT || 8080;

//app setup
var app = express();

var server = app.listen(port, function(){
	console.log('Listening to requests on port.' + port);
});

//static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
	console.log('Made a socket connection.', socket.id);

	socket.on('chat', function(data){
		io.sockets.emit('chat', data);
	});

	socket.on('typing', function(data){
		socket.broadcast.emit('typing', data);
	});

	socket.on('disconnect', function(){
    console.log('user disconnected');
  });
	
});