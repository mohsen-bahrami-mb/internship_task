const expressValidator = require('express-validator');
const check = expressValidator.check;

module.exports = new class{
    anyValidator(){
        return [
            // check().withMessage(),
        ];
    }
}