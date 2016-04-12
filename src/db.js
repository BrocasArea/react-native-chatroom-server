
var models = {};
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

mongoose.plugin(timestamps);

module.exports = (connection) => {

  connection.model('message', new mongoose.Schema({
    roomId: String,
    username: String,
    content: String
  }));

  connection.model('room_user', new mongoose.Schema({
    roomId: String,
    username: String,
    gcmId: String
  }));

  return models;
};
