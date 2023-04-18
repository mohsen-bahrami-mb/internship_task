const express = require('express');
const router = express.Router();
// require routes
const anyRouter = require('./any');
// require middlewares
const error = require('../middlewares/error');

// call routers
router.use("/any", anyRouter);

// handle errors
router.use(error);

module.exports = router;