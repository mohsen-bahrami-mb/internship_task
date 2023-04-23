const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

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
// router.post("/task", controller.removeTask);

module.exports = router;