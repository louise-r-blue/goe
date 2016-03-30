console.log("welcome to goe")

var h = require('hyperscript');
var $ = require("jquery");
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))
var request = require('superagent')

// window.setInterval(refreshMsg, 5000)
// function refreshMsg(){
//   $('div.message').remove()
//   console.log("Time : " )
//   getMessages()
// }
// function testEndPoint(){
//   request
//     .get("http://localhost:3000/v1/messages")
//     .end(function(error,result){
//       console.log("result :", result)
//       console.log("hi: " ,request)
//     });
// }

function testEndPoint(){
  $.get("http://localhost:3000/v1/messages")
    .done(function(data,status){
      console.log("result :", data)
      //oldMessages = data.messages.length;
      for( var i = 0; i < data.messages.length; i++){
        var user_name = data[i].user_name;
        var message = data[i].messages;
        var html = h('div.message', {style: {'font-size': '1.3em'}}, h('p', {}, user_name + ": " + message), h('hr',{}))
        $('main').append(html)
    }
  })
  .fail(function(err){
    console.log(err);
  })
}
// function getMessages() {
//   $.get("http://localhost:3000/v1/messages")
//   .done(function(data){
//     console.log("client", data)
//     oldMessages = data.messages.length;
//     for (var i = 0; i < data.messages.length; i++){
//       //console.log("data : ", data.messages +" : " + "old" + oldMessages)
//       var sender = data.messages[i].sender;
//       var message = data.messages[i].message;
//       var html = h('div.message', {style: {'font-size': '1.5em'}}, h('p', {}, sender + ": " + message), h('hr',{}))
//       $('main').append(html)
//     }
//   })
//   .fail(function(err){
//     console.log(err);
//   })
// }

$(document).ready(function(){
  testEndPoint()
  //getMessages()
  $('form').submit(function(event){
    var newMessage = {}
    newMessage["sender"] = $('input#name').val()
    newMessage["message"] = $('textarea#message').val()
    //this was input#message maybe here need to push new message onto messages array
    $.post("http://localhost:3000/v1/messages", newMessage)//this posts to server
})
})
