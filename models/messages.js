// database
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/ChatAppDB';


  mongoose.connect(dbUrl, {useNewUrlParser: true}).catch(err => console.log('error: mongodb cannot connect'));

var schema = new mongoose.Schema({name: String, message: String});
module.exports = mongoose.model('Messages', schema);
