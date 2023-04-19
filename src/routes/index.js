const express = require('express');
const router = express.Router();
// require routes
const loginRouter = require('./loginRouter');
const adminRouter = require('./adminRouter');
const userRouter = require('./userRouter');
const notFoundRouter = require('./notFoundRouter');
// require middlewares
const error = require('../middlewares/error');

// call routers
//  >> /api/login
router.use("/api/login", loginRouter);
//  >> /api/admin/users
router.use("/api/admin", adminRouter);
//  >> /api/user
//  >> /api/user/task?select-task=taskID
//  >> /api/user/add-task-partners?select-task=taskID
router.use("/api/user", userRouter);
//  >> /not-found
router.use("/not-found", notFoundRouter);

// handle errors
router.use(error);

module.exports = router;