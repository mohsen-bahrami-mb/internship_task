// require modules
const Controller = require('../controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
// require middlewares
const setLoginExpireAt = require('../../middlewares/setLoginExpireAt');

module.exports = new (class extends Controller {

    async getUaers(req, res) {
        const users = await this.User.find();
        this.response({ res, message: "get all users", sCode: 200, data: { users } });
    }

})();