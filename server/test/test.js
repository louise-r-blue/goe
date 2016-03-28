var request = require('supertest')
var test = require('tape');
var app = require('../app')

test('validate post request', function(t){
  request(app)
  .post('/v1/messages')
  .send({
    "sender": "Winter",
    "message": null
  })
  .expect(400)
  .end(function(err,res){
    t.false(err, "this is the correct error status code")
    t.equal(res.text, "String values required in all fields", "Error values required in all fields returned")
    t.end()
  })
})
