const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
    loginValidator() {
        return [
            check("email").notEmpty().withMessage("email cannot be empty")
                .isEmail().withMessage("email format is not correct"),
            check("password").notEmpty().withMessage("password cannot be empty")
        ];
    }
}