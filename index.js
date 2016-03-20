console.log("welcome to goe")

var h = require('hyperscript');
var $ = require("jquery");


window.setInterval(refreshMsg, 5000)
function refreshMsg(){
  $('div.message').remove()
  console.log("Time :")
  getMessages()
}
function getMessages(){
  $.get("http://localhost:3000/v1/messages")
  .done(function(data){
    for (var i = 0; i < data.messages.length; i++){
      var sender = data.messages[i].sender
      var message = data.messages[i].message
      var html = h('div.message', {style: {'font-size': '1.5em'}}, h('p', {}, sender + ": " + message), h('hr',{}))
      $('main').append(html)
    }
  })
  .fail(function(err){
    console.log(err);
  })
}
$(document).ready(function(){
  $('form').submit(function(event){
    var newMessage = {}
    newMessage["sender"] = $('input#name').val()
    newMessage["message"] = $('input#message').val()
    $.post("http://localhost:3000/v1/messages", newMessage)// function(){

    // })
    // .done(function() {
    //   console.log('new message sent!')
    // })
    // .fail(function() {
    //   console.log( 'error' );
    // })
})
})
