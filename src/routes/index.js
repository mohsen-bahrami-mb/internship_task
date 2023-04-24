const express = require('express');
const router = express.Router();
// require routes
const loginRouter = require('./auth');
const adminRouter = require('./admin');
const userRouter = require('./user');
// require middlewares
const { errorApp } = require('../middlewares/error');
const { isLogin, isAdmin } = require('../middlewares/auth');

// call routers
router.use("`/api/auth`", loginRouter);
router.use("/api/admin", isLogin, isAdmin, adminRouter);
router.use("/api/user", isLogin, userRouter);

// handle errors
router.use(errorApp);

module.exports = router;