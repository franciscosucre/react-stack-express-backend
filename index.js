#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('./app'),
  http = require('http'),
  logger = require('./utils/logger'),
  mongoose = require('mongoose'),
  {
    uri,
    options
  } = require('./config/mongoose'),
  {
    port
  } = require('./config/server');

/**
 * Get port from environment and cat in Express.
 */
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
logger.init()
  .then(() => mongoose.connect(uri, options))
  .then(() => {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  })
  .catch(err => console.error('ERROR IN APP STARTUP: ', err))

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;

  logger.info(`Listening on ${bind}`);
}
