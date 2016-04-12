
const Joi = require('Joi');
const Notification = require('../libs/notification');
const identicon = require('identicon-github');

module.exports = {
  method: 'GET',
  path: '/api/v1/user/{username}/avatar',
  config: {
    description: '生成頭像',
    notes: '依照 username 生成頭像',
    tags: ['api'],
    validate: {
      params: {
        username: Joi.string().min(1).required()
      }
    }
  },
  handler: function(request, reply) {

    //
    let username = request.params.username;
    let canvasAvatar = identicon(username, { pixelSize: 16 }); // return a canvas

    // canvas to base64 to buffer
    let base64Avatar = canvasAvatar.toDataURL().replace(/^data:image\/\w+;base64,/, '');
    let bufferAvatar = new Buffer(base64Avatar, 'base64');
    reply(bufferAvatar);
  }
};
