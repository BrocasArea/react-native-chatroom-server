
const Joi = require('Joi');
const Notification = require('../libs/notification');

module.exports = {
  method: 'POST',
  path: '/api/v1/room/{roomId}/message',
  config: {
    description: '發送訊息',
    notes: '發送訊息到聊天室的其他人',
    tags: ['api'],
    validate: {
      params: {
        roomId: Joi.string().min(1).required()
      },
      payload: {
        username: Joi.string().min(1).required(),
        content: Joi.string().required()
      }
    }
  },
  handler: {
    async: async function(request, reply) {
      request.log('info', 'Join Room');

      let roomId = request.params.roomId;
      let username = request.payload.username;
      let content = request.payload.content;

      let db = request.server.plugins['hapi-mongoose'].connection;
      let mesg = await db.model('message').create({ roomId, username, content }); // TODO models.createMessage
      let users = await db.model('room_user').find({ roomId }); // TODO models.findRoomUsers

      // sned message
      let res = await Promise.all(
        users.map(user => Notification.snedGCM(user.gcmId, user.roomId, { username, content }))
      );
      request.log('info', res);

      reply(mesg);
    }
  }

};
