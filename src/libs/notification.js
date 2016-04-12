
const gcm = require('node-gcm');
const sender = new gcm.Sender(process.env.RN_CHATROOM_GCMKEY);

var Notification = {
  //
  snedGCM: function(gcmId, roomId, { username, message }) {
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
  }
};
//
module.exports = Notification;
