// require modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
// require models
const User = require('../models/user');

async function isLogin(req, res, next) {
    // A middleware for login check with "json web token"
    // get token of header
    const token = req.header("auth_token");
    if (!token) return res.status(401).json({ message: "access denied", data: {} });
    // decod token
    let decoded;
    try { decoded = await jwt.verify(token, config.get("jwt.key")); }
    catch { return res.status(400).json({ message: "access denied - invalid token", data: {} }); }
    // find user
    const user = await User.findById(decoded.user_id);
    if (!user) return res.status(404).json({ message: "access denied - invalid token - not fond user", data: {} });
    // set user in requset
    req.user = user;
    next();
}

async function isAdmin(req, res, next) {
    // A middleware for check admin user. if it has admin access, can use next middlewares.
    const isAdmin = await req.user.is_admin;
    if (!isAdmin) return res.status(403).json({ message: "access denied - no admin", data: {} });
    next();
}

module.exports = { isLogin, isAdmin };