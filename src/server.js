'use strict';

const Hapi = require('hapi');
const register = require('./register');

const server = new Hapi.Server();

server.connection({
  port: 3000
});

//
server.isReady = register.injectPlugins(server);

server.isReady.then(() => {
  let connection = server.plugins['hapi-mongoose'].connection;
  let mongoose = server.plugins['hapi-mongoose'].lib;

  //
  try {
    mongoose.set('debug', true);
    require('./db')(connection);
  } catch (err) {
    server.log('error', err);
    server.log('error', err.message);
    server.log('error', err.stack);
  }
})
//
server.route(require('./routes/post_room'));
server.route(require('./routes/post_message'));
server.route(require('./routes/get_message'));
server.route(require('./routes/get_avatar'));

module.exports = server;
