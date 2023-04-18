const winston = require('winston');
const debug = require('debug')('app:main');

module.exports = function () {
    // add errors to "logfile.log"
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));

    // handle errors outside of application
    process.on('uncaughtException', (ex)=>{
        // Synchronous errors
        debug('Uncaught Exception Error');
        winston.error(ex.message, ex);
        process.exit(1);
    });
    process.on('unhandledRejection', (ex)=>{
        // Asynchronous errors
        debug('Uncaught Rejection Error');
        winston.error(ex.message, ex);
        process.exit(1);
    });
}