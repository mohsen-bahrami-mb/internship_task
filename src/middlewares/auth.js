// require modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
// require models
const User = require('../models/user');

async function isLogin(req, res, next) {
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


module.exports = { isLogin };