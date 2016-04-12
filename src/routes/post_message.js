
const Joi = require('Joi');
const Notification = require('../libs/notification');

module.exports = {
  method: 'POST',
  path: '/api/v1/message',
  handler: function(request, reply) {
    let roomId = request.payload.roomId;
    let username = request.payload.username;
    let message = request.payload.message;

    Notification
      .roomBroadcast(roomId, username, message)
      .then(function (response) {
        request.log('info', 'roomBroadcast response: ' + JSON.stringify(response) );
        reply({
          roomId: request.payload.roomId,
          username: request.payload.username,
          message: request.payload.message
        });
      })
      .catch(function (err) {
        console.log('err', err, err.message);
        reply(err);
        throw err
      });
  },
  config: {
    validate: {
      payload: {
        roomId: Joi.string().min(1).required(),
        username: Joi.string().min(1).required(),
        message: Joi.string().required()
      }
    }
  }
};
