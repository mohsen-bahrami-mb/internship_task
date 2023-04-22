const express = require('express');
const router = express.Router();
// require routes
const loginRouter = require('./auth');
const adminRouter = require('./admin');
// const userRouter = require('./user');
// const notFoundRouter = require('./notFound');
// require middlewares
const { errorApp } = require('../middlewares/error');
const { isLogin, isAdmin } = require('../middlewares/auth');

// call routers
//  >> /api/auth/login
router.use("/api/auth", loginRouter);
//  >> /api/admin/users
router.use("/api/admin", isLogin, adminRouter);
//  >> /api/user
//  >> /api/user/task?select-task=taskID
//  >> /api/user/add-task-partners?select-task=taskID
// router.use("/api/user", userRouter);
//  >> /not-found
// router.use("/not-found", notFoundRouter);

// handle errors
router.use(errorApp);

module.exports = router;