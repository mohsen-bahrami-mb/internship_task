const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const taskPriorityEnum = ["high", "medium", "low"];
const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, required: true },
    priority: { type: String, enum: taskPriorityEnum, required: true },
    images_url: [String],
    description: String
});

taskSchema.plugin(timeStamp);

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task, taskPriorityEnum };