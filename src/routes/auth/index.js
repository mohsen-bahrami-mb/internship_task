const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.post("/", controller.login,(res,req)=>{console.log('b')});

module.exports = router;