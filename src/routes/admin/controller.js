// require modules
const Controller = require('../controller');
const bcrypt = require('bcrypt');
const winston = require('winston');
const fs = require('fs');

module.exports = new (class extends Controller {

    async checkUserToUpload(req, res, next) {
        // find user email on database
        const email = req.params.email;
        const targetUser = await this.User.findOne({ email });
        if (!targetUser) return this.response({ res, sCode: 404, message: "not found user email in parameter" });
        req.targetUser = targetUser;
        next();
    }

    async setPhoto(req, res) {
        // check send photo
        if (!req.file) return this.response({ res, message: "No files were uploaded", sCode: 400 });
        // set & save photo. first remove file.then set url without domin(ip)
        if (req.targetUser.image_url.includes("public/profiles_photos/"))
            fs.unlink(req.targetUser.image_url, (err) => { if (err) winston.error(err.message, err) });
        req.targetUser.image_url = "public/profiles_photos/" + req.file.filename;
        req.targetUser.save();
        this.response({
            res, message: "uploded file, successfully", sCode: 200,
            data: { filename: req.file.filename }
        });
    }

    async deletePhoto(req, res) {
        // first remove file.then clear url without domin(ip)
        if (req.targetUser.image_url.includes("public/profiles_photos/"))
        fs.unlink(req.targetUser.image_url, (err) => { if (err) winston.error(err.message, err) });
        req.targetUser.image_url = "";
        req.targetUser.save();
        this.response({ res, message: "delete file, successfully", sCode: 200, });
    }

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
        let { new_email, new_name, new_password, new_is_admin, new_tasks } = req.body;
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
        // set & save photo. first remove file.then set url without domin(ip)
        if (removeUser.image_url.includes("public/profiles_photos/"))
            fs.unlink(removeUser.image_url, (err) => { if (err) winston.error(err.message, err) });
        this.response({
            res, sCode: 200, message: "user is deleted", data: { email: removeUser.email, name: removeUser.name }
        });
    }

})();