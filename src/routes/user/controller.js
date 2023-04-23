const Controller = require('../controller');
const { taskPriorityEnum } = require('../../models/task')

module.exports = new (class extends Controller {

    async getTask(req, res) {
        // get task id of query >> ?select-task=
        const taskId = req.query["select-task"];
        let task;
        try { task = await this.Task.findById(taskId); } catch { }
        if (!task) return this.response({ res, sCode: 404, message: 'cannot find task id in query' });
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
        this.response({ res, sCode: 200, message: "successfully added new task", data: { task } });
    }

    async editTask(req, res) {
        // get task id of query >> ?select-task=
        const taskId = req.query["select-task"];
        let editTask;
        try { editTask = await this.Task.findById(taskId); } catch { }
        if (!editTask) return this.response({ res, sCode: 404, message: 'cannot find task id in query(select-task=)' });
        // validation task body
        let { name, priority, images_urls, description } = req.body;
        if (!taskPriorityEnum.includes(priority))
            return this.response({ res, sCode: 400, message: "priority should be one of (high, medium, low)" });
        if (images_urls) images_urls.map(e => e.toString());
        if (description) description = description.toString(); else description = "";
        // set changes task on database
        editTask.set({
            name: name,
            priority: priority,
            images_urls: images_urls,
            description: description
        });
        await editTask.save();
        // send response
        this.response({ res, message: "change task detail", sCode: 200, data: editTask });
    }

})();