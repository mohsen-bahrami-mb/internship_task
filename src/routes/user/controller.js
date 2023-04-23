const Controller = require('../controller');
const { taskPriorityEnum } = require('../../models/task')

module.exports = new (class extends Controller {

    async getTask(req, res) {
        // get task id of query >> ?select-task=
        const taskId = req.query["select-task"];
        let task;
        try { task = await this.Task.findById(taskId); } catch { }
        if (!task) return this.response({ res, sCode: 404, message: 'cannot find task id in query' });
        this.response({ res, sCode: 200, message: 'we are good', data: task });
    }

    async createTask(req, res) {
        let { name, priority, images_url, description } = req.body;
        // validation task body
        if (!taskPriorityEnum.includes(priority))
        return this.response({ res, sCode: 400, message: "priority should be one of (high, medium, low)" });
        if (images_url) images_url.map(e => e.toString());
        if (description) description = description.toString(); else description = "";
        // create task
        const task = await new this.Task({
            name,
            creator: req.user._id,
            priority,
            images_url,
            description
        });
        task.save();
        // save task on user tasks
        req.user.tasks.push(task._id);
        // ".save()" method called in previous for user. it called in "setLoginExpireAt"
        this.response({ res, sCode: 200, message: "successfully added new task", data: { task } });
    }

})();