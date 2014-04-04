var http     = require('http'),
    express  = require('express'),
    io = require('socket.io');

var app = express();

app.get('/', function(req, res){
  res.sendfile(__dirname + '/app/index.html')
})

var server = http.createServer(app);

server.listen(3000, function() {
  console.log("Server is running");
});
