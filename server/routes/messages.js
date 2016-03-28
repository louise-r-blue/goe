var express = require('express');
var router = express.Router();

messages = {
  messages: [
    {
      "id": 1,
      "sender": "Winter",
      "message": "Ice still grips you spring"
    },
   ]
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(messages);
});

router.post('/', function(req, res, next) {
  var newMessage = req.body
  if (validate(newMessage) == false){
    res.status(400).send('String values required in all fields')
  }
  newMessage["id"] = messages.messages.length + 1
  messages.messages.push(newMessage)
  res.json(messages);
});

function validate(message) {
  for (var property in message) {
    if (typeof message[property] != 'string' || message[property] == '') {
      return false
    }
  }
  return true
}

module.exports = router;
