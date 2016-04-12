
const Joi = require('Joi');
const Notification = require('../libs/notification');

module.exports = {
  method: 'POST',
  path: '/api/v1/room',
  handler: function(request, reply) {
    request.log('info', 'Join Room');

    let roomId = request.payload.roomId;
    let username = request.payload.username;
    let gcmId = request.payload.gcmId;

    Notification
      .addUserToRoom(roomId, username, gcmId)
      .then(function () {
        reply({
          roomId: request.payload.roomId,
          username: request.payload.username,
          gcmId: request.payload.gcmId
        });
      })
      .catch(function (err) {
        throw err
      });
  },
  config: {
    validate: {
      payload: {
        roomId: Joi.string().min(1).required(),
        username: Joi.string().min(1).required(),
        gcmId: Joi.string().required()
      }
    }
  }
};
