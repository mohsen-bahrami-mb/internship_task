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

module.exports = router;