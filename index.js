console.log("welcome to goe")

var h = require('hyperscript');
var $ = require("jquery");
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'))
var request = require('superagent')

window.setInterval(refreshMsg, 5000)
function refreshMsg(){
  $('div.message').remove()
  console.log("Time : " )
  getMessages()
}

function getMessages() {
  $.get("http://localhost:3000/v1/messages")
  .done(function(data){
    oldMessages = data.messages.length;
    for (var i = 0; i < data.messages.length; i++){
      console.log("data : ", data.messages +" : " + "old" + oldMessages)
      var sender = data.messages[i].sender;
      var message = data.messages[i].message;
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
// open messages promsify and fs read/write
fs.readFileAsync(__dirname + "/data/myMessages.json", "utf8")//need a data dir and data.json
.then(function(contents){
  var msgObject = JSON.parse(contents)
    return request.get(msgObject.text)//?
    .endAsync()
  })
.then(function(res){
    var msgs = parseToObject(extractMsgs(res.text)) //extractMsgs - function to get file contents
    return fs.writeFileAsync(__dirname + "/data/msgs.json", JSON.stringify(msgs), 'utf8')
  })
.catch(function(error){
  console.log(error)
})
})
})
// $(document).ready(function(){
//   $('form').submit(function(event){
//     var newMessage = {}
//     newMessage["sender"] = $('input#name').val()
//     newMessage["message"] = $('textarea#message').val() //this was input#message
//     // maybe here need to push new message onto messages array
//     $.post("http://localhost:3000/v1/messages", newMessage)//this posts to server
// })
// })

// console.log("welcome to goe")

// var h = require('hyperscript');
// var $ = require("jquery");


// window.setInterval(refreshMsg, 5000)
// function refreshMsg(){
//   $('div.message').remove()
//   console.log("Time : ")
//   getMessages()
// }

// function getMessages() {
//   $.get("http://localhost:3000/v1/messages")
//   .done(function(data){
//     oldMessages = data.messages.length;
//     for (var i = 0; i < data.messages.length; i++){
//       console.log("data : ", data.messages +" : " + "old" + oldMessages)
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

// $(document).ready(function(){
//   $('form').submit(function(event){
//     var newMessage = {}
//     newMessage["sender"] = $('input#name').val()
//     newMessage["message"] = $('textarea#message').val() //this was input#message
//     $.post("http://localhost:3000/v1/messages", newMessage)// function(){
//     // })
//     // .done(function() {
//     //   console.log('new message sent!')
//     // })
//     // .fail(function() {
//     //   console.log( 'error' );
//     // })
// })
// })
