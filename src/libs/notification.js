
const gcm = require('node-gcm');
const sender = new gcm.Sender(process.env.RN_CHATROOM_GCMKEY);

var Notification = {

  addUserToRoom: function(roomId, username, gcmId) {
    Notification._rooms[roomId] = Notification._rooms[roomId] || {};
    Notification._rooms[roomId][username] = gcmId;
    return Promise.resolve(true);
  },

  roomBroadcast: function(roomId, username, message) {
    var room = Notification._rooms[roomId] || {};

    var snedMessage = Object.keys(room).map(function (name) {
      if (username === name) {
        return Promise.resolve(true);
      }
      return Notification.snedGCM(room[name], roomId, message);
    });

    return Promise.all(snedMessage);
  },

  //
  snedGCM: function(gcmId, roomId, message) {
    return new Promise(function (resolve, reject) {
      //
      var message = new gcm.Message();
      message.addData('roomId', roomId);
      message.addData('message', message);

      //
      sender.send(message, { registrationTokens: [gcmId] }, function (err, response) {
        if(err) reject(err);
        else    resolve(response);
      });
    });
  },

  _rooms: {
    // roomId_qwerty2313: { jack: 'gcm_jsdkasjio1291239123' }
  }
}
//
module.exports = Notification;
