const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');
// require middlewares
const { upload } = require('../../middlewares/fileUpload');
const uploadProfile = upload("public/profiles_photos", 1048576, ["image/jpg", "image/jpeg", "image/png"]);

router.get("/users", controller.getUaers);
router.post("/users",
    validator.createUserValidator(),
    controller.validate,
    controller.createUser
);
router.put("/users/:email",
    validator.editUserValidator(),
    controller.validate,
    controller.editUser
);
router.put("/users/upload-profile-photo/:email",
    controller.checkUserToUpload,
    uploadProfile.single('profile_photo'),
    controller.setPhoto
);
router.delete("/users/delete-profile-photo/:email",
    controller.checkUserToUpload,
    controller.deletePhoto
);
router.delete("/users/:email", controller.removeUaer);

module.exports = router;