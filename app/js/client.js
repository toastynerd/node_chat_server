'use strict';

var $  = require('jquery');

$(function(){
  var socket = io.connect('http://localhost');
  $('#chat').on('submit', function(e){
    e.preventDefault();
    var message = $('#chat_text').val();
    socket.emit('message', {message: message});
    $('#chat_text').val('');
  });
  socket.on('message', function(data){
    $('#chat_log').append(data.message);
    $('#chat_log').append('</br>');
  });
});
