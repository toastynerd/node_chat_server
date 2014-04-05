var http     = require('http'),
    express  = require('express'),
    socketio = require('socket.io');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/build/index.html')
})

var server = http.createServer(app);
var io = socketio.listen(server);
var allSockets = [];
io.sockets.on('connection', function(socket){
  allSockets.push(socket);
  socket.on('message', function(data){
    console.log(data.message);
    allSockets.forEach(function(socket){
      socket.emit('message', {message: data.message});
    });
  });
  console.log("connected!");
});

server.listen(app.get('port'), function(){
  console.log("server running on port: " + app.get('port'));
});
