const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {
    taskValidator() {
        return [
            check("name").notEmpty().withMessage("name cannot be empty")
                .isString().withMessage("name format should be a string"),
            check("priority").notEmpty().withMessage("priority cannot be empty")
                .isString().withMessage("priority format should be a string"),
        ];
    }
}