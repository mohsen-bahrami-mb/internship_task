const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creatpor: { type: mongoose.Schema.Types.ObjectId, required: true },
    priority: { type: String, enum: ["high", "medium", "low"] },
    images_url: [String],
    description: String
});

taskSchema.plugin(timeStamp);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;