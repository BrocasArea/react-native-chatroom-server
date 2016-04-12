
const Joi = require('Joi');
const Notification = require('../libs/notification');

module.exports = {
  method: 'POST',
  path: '/api/v1/room/{roomId}/reg',
  config: {
    description: '加入聊天室',
    notes: '加入聊天室並且把 GCM ID 註冊到聊天室裡面',
    tags: ['api'],
    validate: {
      payload: {
        roomId: Joi.string().min(1).required(),
        username: Joi.string().min(1).required(),
        gcmId: Joi.string().required()
      }
    }
  },
  handler: {
    async: async function(request, reply) {
      request.log('info', 'Join Room');

      let roomId = request.payload.roomId;
      let username = request.payload.username;
      let gcmId = request.payload.gcmId;

      // TODO models.addUserToRoom
      let db = request.server.plugins['hapi-mongoose'].connection;
      let doc = await db.model('room_user').findOneAndUpdate({ roomId, username, gcmId }, { gcmId }, { new: true, upsert: true });

      reply(doc);
    }
  }
};
