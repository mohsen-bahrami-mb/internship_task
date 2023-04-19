module.exports = function (user) {
    // update login expire time for: expiry time to check stayed in login state
    const nowDate = new Date().getTime();
    const last3Hour = nowDate + (1000 * 60 * 60 * 3);
    user.login_expireAt = new Date(last3Hour);
    user.save();
}