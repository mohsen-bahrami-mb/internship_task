const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.post("/login", controller.login);

module.exports = router;