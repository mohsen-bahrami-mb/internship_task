const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
// require middlewares
const { upload } = require('../../middlewares/fileUpload');
const uploadFile = upload("public/tasks_photos/", 1048576, [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/tiff",
    "audio/mp3",
    "video/mp4",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint",
    "application/msword",
    "application/pdf",
    "application/zip"
]);

router.get("/all-tasks", controller.getAllTasks);
router.get("/task", controller.getTask);
router.post("/task",
    validator.taskValidator(),
    controller.validate,
    controller.createTask
);
router.put("/task",
    validator.taskValidator(),
    controller.validate,
    controller.editTask
);
router.put("/task/upload-task-photo",
    controller.checkUserToUpload,
    uploadFile.single('task_photo'),
    controller.setFile
);
router.delete("/task/delete-task-photo",
    controller.checkUserToUpload,
    controller.deleteFile
);
router.delete("/task", controller.removeTask);

module.exports = router;