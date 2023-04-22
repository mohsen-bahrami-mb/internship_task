const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
    createUserValidator() {
        return [
            check("email").notEmpty().withMessage("email cannot be empty")
                .isEmail().withMessage("email format is not correct"),
            check("name").notEmpty().withMessage("name cannot be empty"),
            check("password").notEmpty().withMessage("password cannot be empty")
        ];
    }
}