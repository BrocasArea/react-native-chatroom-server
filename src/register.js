const Good = require('good');

module.exports = {
  injectPlugins: (server) => {
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
    return ;
  }
};
