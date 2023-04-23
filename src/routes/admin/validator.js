const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class {

    createUserValidator() {
        return [
            check("email").notEmpty().withMessage("email cannot be empty")
                .isEmail().withMessage("email format is not correct"),
            check("name").notEmpty().withMessage("name cannot be empty")
                .isString().withMessage("name is not a string"),
            check("password").notEmpty().withMessage("password cannot be empty")
                .isString().withMessage("password is not a string")
        ];
    }

    editUserValidator() {
        return [
            check("new_email").notEmpty().withMessage("new_email cannot be empty")
                .isEmail().withMessage("new_email format is not correct"),
            check("new_name").notEmpty().withMessage("new_name cannot be empty")
                .isString().withMessage("new_name is not a string"),
            check("new_password").notEmpty().withMessage("new_password cannot be empty")
                .isString().withMessage("new_password is not a string"),
            check("new_is_admin").notEmpty().withMessage("'new_is_admin' part cannot be empty")
                .isBoolean().withMessage("'new_is_admin' part is not a boolean"),
            check("new_image_url").isString().withMessage("'new_image_url' part is not a string"),
            check("new_tasks").isArray().withMessage("'new_tasks' part is not an array")
        ];
    }

}