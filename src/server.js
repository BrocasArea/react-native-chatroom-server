'use strict';

const Hapi = require('hapi');
const register = require('./register');

const server = new Hapi.Server();

server.connection({
  port: 3000
});

//
register.injectPlugins(server);
//
server.route(require('./routes/post_room'));
server.route(require('./routes/post_message'));

module.exports = server;
