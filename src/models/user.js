const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    login_expireAt: Date,
    image_url: String,
    tasks: { type: [mongoose.Schema.Types.ObjectId], ref: "Task" }
});

userSchema.plugin(timeStamp);

const User = mongoose.model("User", userSchema);

module.exports = User;