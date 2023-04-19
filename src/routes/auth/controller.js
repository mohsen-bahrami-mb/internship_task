const Controller = require('../controller');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = new (class extends Controller {

    async login(req, res) {
        const { email, password } = req.body;
        // check, email has existed on database
        const user = await this.User.findOne({ email });
        if (!user) return this.response({ res, sCode: 400, message: "invalid email or password" });
        // check, password was currect
        const isValide = await bcrypt.compare(password, user.password);
        if (!isValide) return this.response({ res, sCode: 400, message: "invalid email or password" });
        // set json-web-token -> frontend save jwt on local storage as "auth_token"
        const token = jwt.sign({ user_id: user._id }, config.get("jwt.key"));
        this.response({ res, sCode: 200, message: 'successfully logged in user', data: { auth_token: token } });
    }

})();