const Good = require('good');
const Inert = require('inert');
const Vision = require('vision');
const Blipp = require('blipp');
const HapiSwagger = require('hapi-swagger');
const HapiAsyncHandler = require('hapi-async-handler');
const Tv = require('tv');
const Pack = require('../package');

const HapiGoodOptions = {
  reporters: [{
    reporter: require('good-console'),
    events: {
      mongoose: '*',
      request: '*',
      response: '*',
      log: '*'
    }
  }]
};

const HapiSwaggerOptions = {
  // lang: 'zh-cn',
  info: {
    'title': 'RN Chatroom API Documentation',
    'version': Pack.version,
  }
};

const MONGODB_ADDR = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost:27017';
const HapiMongooseOptions = {
    bluebird: false,
    uri: `mongodb://${MONGODB_ADDR}/rn_chatroom`
};

module.exports = {
  injectPlugins: (server) => {
    return Promise.all([

      // better consloe.log
      server.register({
        register: Good,
        options: HapiGoodOptions
      }),

      // auto documentation
      server.register([ Inert, Vision, {
        'register': HapiSwagger,
        'options': HapiSwaggerOptions
      }]),

      // connect mongodb
      server.register({
          register: require('hapi-mongoose'),
          options: HapiMongooseOptions
      }),

      // support async handler
      server.register({
          register: HapiAsyncHandler
      }),

      // show routers in startup
      server.register({
        register: Blipp,
        options: {
          showAuth: false,
          showStart: true
        }
      }),

      // request debug panel
      server.register({
        register: Tv,
        options: {}
      })

    ]);
  }
};
