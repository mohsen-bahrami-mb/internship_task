const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.get("/", validator.anyValidator(), controller.getAny);

module.exports = router;