var express = require('express');
var router = express.Router();
var Message = require('../models/messages');

// routing
router.get('/messages', (req, res) => {
  Message.find({}, (err, messages)=> {
    res.send(messages);
  })
});

router.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if(err)
      res.sendStatus(500);
    res.sendStatus(200);
    req.io.emit('message', req.body);
  })
})


module.exports = router;
