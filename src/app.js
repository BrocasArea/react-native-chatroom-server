'use strict';

const server = require('./server');

server.isReady.then( () => {

  server.start((err) => {
    if (err) {
      throw err;
    }
    server.log('info', 'Server running at: ' + server.info.uri);
  });

});
