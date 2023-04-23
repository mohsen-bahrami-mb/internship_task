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
        if (existedUser) return this.response({ res, sCode: 400, message: "this user has already been" });
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
        await user.save();
        // send response
        this.response({ res, message: "new user", sCode: 200, data: user });
    }

    async editUser(req, res) {
        // find user email on database
        const email = req.params.email;
        const editUser = await this.User.findOne({ email });
        if (!editUser) return this.response({ res, sCode: 404, message: "not found user email in parameter" });
        // get detail of body
        let { new_email, new_name, new_password, new_is_admin, new_image_url, new_tasks } = req.body;
        // check, "new_email" has existed on database
        const existedUser = await this.User.findOne({ email: new_email });
        if (existedUser && email != existedUser.email)
            return this.response({ res, sCode: 400, message: "this user has already been" });
        // change password to hash
        const salt = await bcrypt.genSalt(10);
        new_password = await bcrypt.hash(new_password, salt);
        // check tasks id is currect. then add to new tasks.
        let failedSendTask = [];
        let userNewTasks = [];
        let userOldTasks = [...editUser.tasks];
        await Promise.all(await new_tasks.map(async (tId) => {
            const isOldTask = userOldTasks.find(t => t._id == tId);
            if (isOldTask) return userNewTasks.push(tId);
            try {
                const isExistTask = await this.Task.findById(tId);
                if (isExistTask) return userNewTasks.push(tId);
            } catch {
                failedSendTask.push(`cannot find task id: ${tId}`);
            }
        }));
        if (failedSendTask.length)
            return this.response({ res, sCode: 404, message: "cannot find tasks", data: failedSendTask });
        // set changes user on database
        editUser.set({
            email: new_email,
            name: new_name,
            password: new_password,
            is_admin: new_is_admin,
            image_url: new_image_url,
            tasks: userNewTasks
        });
        await editUser.save();
        // send response
        this.response({ res, message: "change user details", sCode: 201, data: editUser });
    }

    async removeUaer(req, res) {
        // find user email on database
        const email = req.params.email;
        const removeUser = await this.User.findOneAndRemove({ email });
        if (!removeUser) return this.response({ res, sCode: 404, message: `cannot find this user (${email})` });
        this.response({
            res, sCode: 200, message: "user is deleted", data: { email: removeUser.email, name: removeUser.name }
        });
    }

})();