const fs = require('fs');
const Controller = require('../controller');
const { taskPriorityEnum } = require('../../models/task')

module.exports = new (class extends Controller {

    async checkUserToUpload(req, res, next) {
        // get task id of query >> ?select-task=
        const taskId = req.query["select-task"];
        let task;
        try { task = await this.Task.findById(taskId); } catch { }
        if (!task) return this.response({ res, sCode: 404, message: 'cannot find task id in query(select-task=)' });
        // check user is partner in this task
        const isUserTask = req.user.tasks.find(t => t._id == taskId);
        if (!isUserTask) return this.response({ res, sCode: 401, message: "access denied - your not partner in this task" });
        req.targetTask = task;
        next();
    }

    async setFile(req, res) {
        // check send photo
        if (!req.file) return this.response({ res, message: "No files were uploaded", sCode: 400 });
        // set & save photo. set url without domin(ip)
        req.targetTask.images_urls.push(("public/tasks_photos/" + req.file.filename));
        req.targetTask.save();
        // send response
        this.response({
            res, message: "uploded file, successfully", sCode: 200,
            data: { filename: req.file.filename }
        });
    }

    async deleteFile(req, res) {
        // check img_url is currect
        const fileURL = req.body.img_url;
        const isExistURL = req.targetTask.images_urls.find(e => e.includes(fileURL));
        if (!isExistURL) return this.response({ res, sCode: 404, message: `cannot find this file ${fileURL}` });
        // first remove file.then clear url without domin(ip)
        fs.unlink(fileURL, (err) => { if (err) winston.error(err.message, err) });
        const newImagesURLs = req.targetTask.images_urls.filter(e => !e.includes(fileURL));
        req.targetTask.images_urls = newImagesURLs;
        req.targetTask.save();
        // send response
        this.response({ res, message: "delete file, successfully", sCode: 200, });
    }

    async getAllTasks(req, res) {
        const allUserTasksId = req.user.tasks;
        const allUserTasks = await this.Task.find({ _id: { $in: allUserTasksId } });
        this.response({ res, sCode: 200, message: 'get a task', data: allUserTasks });
    }

    async getTask(req, res) {
        // get task id of query >> ?select-task=
        const taskId = req.query["select-task"];
        let task;
        try { task = await this.Task.findById(taskId); } catch { }
        if (!task) return this.response({ res, sCode: 404, message: "cannot find task id in query(select-task=)" });
        // check user is partner in this task
        const isUserTask = req.user.tasks.find(t => t._id == taskId);
        if (!isUserTask) return this.response({ res, sCode: 401, message: "access denied - your not partner in this task" });
        // send response
        this.response({ res, sCode: 200, message: 'get a task', data: task });
    }

    async createTask(req, res) {
        let { name, priority, images_urls, description } = req.body;
        // validation task body
        if (!taskPriorityEnum.includes(priority))
            return this.response({ res, sCode: 400, message: "priority should be one of (high, medium, low)" });
        if (images_urls) images_urls.map(e => e.toString());
        if (description) description = description.toString(); else description = "";
        // create task
        const task = await new this.Task({
            name,
            creator: req.user._id,
            priority,
            images_urls,
            description
        });
        task.save();
        // save task on user tasks
        req.user.tasks.push(task._id);
        // ".save()" method called in previous for user. it called in "setLoginExpireAt"
        this.response({ res, sCode: 201, message: "successfully added new task", data: task });
    }

    async editTask(req, res) {
        // get task id of query >> ?select-task=
        const taskId = req.query["select-task"];
        let task;
        try { task = await this.Task.findById(taskId); } catch { }
        if (!task) return this.response({ res, sCode: 404, message: 'cannot find task id in query(select-task=)' });
        // check user is partner in this task
        const isUserTask = req.user.tasks.find(t => t._id == taskId);
        if (!isUserTask) return this.response({ res, sCode: 401, message: "access denied - your not partner in this task" });
        // validation task body
        let { name, priority, images_urls, description } = req.body;
        if (!taskPriorityEnum.includes(priority))
            return this.response({ res, sCode: 400, message: "priority should be one of (high, medium, low)" });
        if (images_urls) images_urls.map(e => e.toString());
        if (description) description = description.toString(); else description = "";
        // set changes task on database
        task.set({
            name: name,
            priority: priority,
            images_urls: images_urls,
            description: description
        });
        await task.save();
        // send response
        this.response({ res, message: "change task detail", sCode: 201, data: task });
    }

    async removeTask(req, res) {
        // get task id of query >> ?select-task=
        const taskId = req.query["select-task"];
        // check user is partner in this task
        const isUserTask = req.user.tasks.find(t => t._id == taskId);
        if (!isUserTask) return this.response({ res, sCode: 401, message: "access denied - your not partner in this task" });
        let task;
        try {
            // delete task of database
            task = await this.Task.findByIdAndRemove(taskId);
            // delete file and images
            task.images_urls.forEach(e =>
                fs.unlink(e, (err) => { if (err) winston.error(err.message, err) }));
            // delete task of "user.tasks" on database
            let userOldTasks = [...req.user.tasks];
            let userNewTasks = [];
            userOldTasks.forEach(t => { if (t._id != taskId) userNewTasks.push(t) });
            req.user.tasks = userNewTasks;
        } catch { }
        if (!task) return this.response({ res, sCode: 404, message: 'cannot find task id in query(select-task=)' });
        req.user.save();
        this.response({ res, sCode: 200, message: "task is deleted", data: task });
    }

})();