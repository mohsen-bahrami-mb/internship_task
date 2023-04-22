// require modules
const Controller = require('../controller');
const bcrypt = require('bcrypt');

module.exports = new (class extends Controller {

    async getUaers(req, res) {
        const users = await this.User.find();
        this.response({ res, message: "get all users", sCode: 200, data: { users } });
    }

    async createUser(req, res) {
        let { email, name, password } = req.body;
        // check, email has existed on database
        const existedUser = await this.User.findOne({ email });
        if (existedUser) return this.response({ res, message: "this user has already been" });
        // change password to hash
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        // set new user on database
        const user = await new this.User({
            email,
            name,
            password,
            is_admin: false,
            login_expireAt: new Date(),
            image_url: "",
            tasks: []
        });
        user.save();
        // send response
        this.response({ res, message: "new user", sCode: 200, data: user });
    }

})();