const {
    format
} = require('util');


/**
 * 
 *
 * @class ErrorHandler
 */
class ErrorHandler {

    constructor(opts) {
        opts = Object.assign({
            logger: console,
            stack: true
        }, opts);
        this.logger = opts.logger;
        this.stack = opts.stack;
    }

    /**
     * Defines how the app logs the error information
     *
     * @param {*} err
     * @param {*} req
     * @param {*} res
     * @memberof ErrorHandler
     */
    report(err, req, res) {
        let responseString = `Response ${req.id}: ${req.method} ${req.path} ${err.status || err.statusCode}`
        let errorString;
        let stackString;
        if (typeof err.getErrorString === 'function') {
            errorString = err.getErrorString(req, res);
        } else {
            errorString = format('%s - %d: %s',
                err.code || err.name,
                err.status,
                err.message
            )
        }
        if (this.stack) {
            stackString = err.stack;
        }
        this.logger.error(`${responseString} --> ${errorString} ${stackString}`);
    }

    /**
     * Defines how the app will react to an error. It should
     * return a error message, an error status, an identification
     * codename (or code) for the error and a error stack if we are
     * working in a development envoirment
     *
     * @param {*} err
     * @param {*} req
     * @param {*} res
     * @returns
     * @memberof ErrorHandler
     */
    handle(err, req, res) {
        /* If the error object has a report method we use it */
        if (typeof err.handle === 'function') {
            return err.handle(req, res);
        }
        const json = {
            status: err.status || 500,
            code: err.code || err.name,
            message: err.message || "Unexpected Error",
        };
        if (this.stack) {
            json.stack = err.stack
        }
        return res.status(json.status).json(json);
    }
}

module.exports = ErrorHandler;