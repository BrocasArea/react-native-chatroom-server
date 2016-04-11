'use strict';

const Hapi = require('hapi');
const Good = require('good');
const Notification = require('./notification');

const server = new Hapi.Server();

server.connection({
  port: 3000
});

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        request: '*',
        response: '*',
        log: '*'
      }
    }]
  }
}, (err) => {
  if (err) {
    throw err; // something bad happened loading the plugin
  }
  server.log('info', 'Server registered : good-console');
});

//
server.route({
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
  }
});

server.route({
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
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  server.log('info', 'Server running at: ' + server.info.uri);
});
