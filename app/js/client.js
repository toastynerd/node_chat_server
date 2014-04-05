'use strict';

var $  = require('jquery');

$(function(){
  var socket = io.connect('http://http://chat.hobbitsynergy.com');
  $('#chat').on('submit', function(e){
    e.preventDefault();
    var message = $('#chat_text').val();
    socket.emit('message', {message: message});
    $('#chat_text').val('');
  });
  socket.on('message', function(data){
    $('#chat_log').append(document.createTextNode(data.message);
    $('#chat_log').append('</br>');
  });
});
