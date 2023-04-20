const autoBind = require('auto-bind');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const Task = require('../models/task');

// Abstraction methods & properties
const _validationBody = Symbol();

module.exports = class {
    constructor() {
        /**
         * "auto-bind" package:
         * bind "this" to middlewares functionality, when use in routes.
         * when use "this" at Inheritance,
         * needs to use this "Class" to run these functions or any functions in childerns.
        */
        autoBind(this);
        // add models to this object for better access
        this.User = User;
        this.Task = Task;
    }

    [_validationBody](req, res) {
        // return errors as response
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorList = errors.array();
            let messages = [];
            errorList.forEach((err) => messages.push(err.msg));
            this.response({ res, message: "validation error", sCode: 400, data: messages });
            return false;
        } else {
            return true;
        }
    }

    validate(req, res, next) {
        // middleware to decide send errors or continue proc
        if (!this[_validationBody](req, res)) return;
        next();
    }

    response({ res, message, sCode = 200, data = {} }) {
        // send response
        res.status(sCode).json({ message, data });
    }
}