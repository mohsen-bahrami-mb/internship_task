const winston = require('winston');

function errorApp(err, req, res, next) {
    // handle all errors, insted of "try-catch" in a middleware
    winston.error(err.message, err);
    res.status(500).json({ data: {}, message: "server error: something failed" });
}

module.exports = { errorApp };