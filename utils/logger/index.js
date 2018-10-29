const ElasticSearchRestLogger = require('elastic-search-rest-log'),
    loggerOptions = require('../../config/logger');

module.exports = new ElasticSearchRestLogger(loggerOptions);