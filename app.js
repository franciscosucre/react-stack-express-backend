const express = require('express'),
    cors = require('cors'),
    compression = require('compression'),
    router = require('./routes'),
    helmet = require('helmet'),
    swaggerJSDoc = require('swagger-jsdoc'),
    swaggerUi = require('swagger-ui-express'),
    ErrorHandler = require('./exceptions'),
    app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


/* ----------------------------- APP ----------------------------- */
app.set("port", process.env.PORT || 3000);
app.use(helmet(require('./config/helmet')))
app.use(cors(require('./config/cors')));
app.use(compression(require('./config/compression')));
app.use(express.json(require('./config/json')));
app.use(express.urlencoded(require('./config/urlencoded')));

/* ----------------------------- LOGGING ----------------------------- */
const logger = require('./utils/logger');

/* ----------------------------- REQUEST IDENTIFICATION ----------------------------- */
app.use(function (req, res, next) {
    req.id = Math.random().toString(36).substr(2);
    next();
});

/* ----------------------------- RESPONSE BODY ----------------------------- */
app.use((req, res, next) => {
    res.defaultJson = res.json;
    res.json = (body) => {
        res.body = body;
        res.defaultJson(body);
    };
    next();
});

/* ----------------------------- REQUEST LOGGING ----------------------------- */
app.use(function (req, res, next) {
    if (req.method == 'GET') {
        logger.info({
            type: 'request',
            id: req.id,
            method: req.method,
            path: req.path,
            query: res.query,
            message: `Request ${req.id} ${req.method} ${req.path} ---> querystring: ${JSON.stringify(req.query)}`,
        });
    } else {
        logger.info({
            type: 'request',
            id: req.id,
            method: req.method,
            path: req.path,
            body: res.body,
            message: `Request ${req.id} ${req.method} ${req.path} ---> body: ${JSON.stringify(req.body)}`,
        });
    }
    next();
});

/* ----------------------------- SWAGGER ----------------------------- */
const options = {
    definition: require('./swagger/definition'),
    apis: [
        './node_modules/unified-queryparams/swagger/components/parameters.yaml',
        './swagger/components/definitions.yaml',
        './swagger/components/errors.yaml',
        './swagger/components/responses.yaml',
        './routes/cats.js'
    ],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, require('./config/swagger')));

/* ----------------------------- ROUTES ----------------------------- */
app.options("/*", function (req, res, next) {
    res.json(200);
    next();
});
app.use('/', router);

/* ----------------------------- RESPONSE LOGGING ----------------------------- */
app.use((req, res, next) => {
    logger.info({
        type: 'response',
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        body: res.body,
        message: `Response ${req.id} ${req.method} ${req.path} ${res.statusCode} ${res.statusMessage} ---> body: ${JSON.stringify(res.body)}`
    });
    next();
});


/* ----------------------------- ERROR HANDLING ----------------------------- */
const errorHandler = new ErrorHandler({
    logger
});
app.use((err, req, res, next) => {
    errorHandler.handle(err, req, res);
    errorHandler.report(err, req, res);
    next();
})

module.exports = app;
