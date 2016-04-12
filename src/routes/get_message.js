
const Joi = require('joi');
const Notification = require('../libs/notification');

module.exports = {
  method: 'GET',
  path: '/api/v1/room/{roomId}/message',
  config: {
    description: '取得訊息',
    notes: '取得特定聊天室的訊息紀錄',
    tags: ['api'],
    validate: {
      params: {
        roomId: Joi.string().min(1).required()
      },
      query: {
        startAt: Joi.date().default(null),
        limit: Joi.number().integer().default(10)
      }
    }
  },
  handler: {
    async: async function(request, reply) {
      request.log('info', 'Join Room');
      request.log(['info', 'sort'], request.query.sort);

      let roomId = request.params.roomId;
      let limit = request.query.limit;
      let sort = request.query.sort;
      let startAt = request.query.startAt || Date.now();

      // TODO models.findRoomMessages
      let db = request.server.plugins['hapi-mongoose'].connection;
      let messages = await db.model('message')
                             .find({ roomId })
                             .where('createdAt').lt(startAt)
                             .sort('-createdAt')
                             .limit(limit);

      reply(messages);
    }
  }
};
