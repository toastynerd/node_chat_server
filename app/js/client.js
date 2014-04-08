'use strict';

var $   = require('jquery');
var env = require('env');

$(function(){
  console.log(env.socket_server);
  var socket = io.connect(env.socket_server);
  $('#chat').on('submit', function(e){
    e.preventDefault();
    var message = $('#chat_text').val();
    socket.emit('message', {message: message});
    $('#chat_text').val('');
  });
  socket.on('message', function(data){
    $('#chat_log').append(document.createTextNode(data.message));
    $('#chat_log').append('</br>');
  });
});
