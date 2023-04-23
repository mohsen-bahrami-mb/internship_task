const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.get("/users", controller.getUaers);
router.post("/users",
    validator.createUserValidator(),
    controller.validate,
    controller.createUser
);
router.put("/users/:email",
    validator.editUserValidator(),
    controller.validate,
    controller.editUser
);

module.exports = router;