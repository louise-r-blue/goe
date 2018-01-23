console.log("welcome to goe")

var h = require('hyperscript');
var $ = require("jquery");
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))
var request = require('superagent')



function testEndPoint(){
  $.get("http://localhost:9966/v1/messages")
    .done(function(data,status){
      //console.log("result :", data.length)
      for( var i = 0; i < data.length; i++){
        var user_name = data[i].user_name;
        var message = data[i].messages;
        console.log("user", user_name, message)
        var html = h('div.message', {style: {'font-size': '1.1em'}}, h('p', {}, user_name + ": " + message), h('hr',{}))
        $('main').append(html)
    }
  })
  .fail(function(err){
    console.log(err);
  })
}


$(document).ready(function(){
  testEndPoint()
  //getMessages()
  $('form').submit(function(event){
    var newMessage = {}
    newMessage["sender"] = $('input#name').val()
    newMessage["message"] = $('textarea#message').val()
    //this was input#message maybe here need to push new message onto messages array
    // $.post("http://localhost:3000/v1/messages", newMessage)//this posts to server
      $.post("http://localhost:9966/v1/messages", newMessage)//this posts to server
})
})
