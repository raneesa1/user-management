const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');
const authenticateUser = require('../middleware/jwt');
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'public/photos');
    },
    filename: function (req, file, cb) {
        // Define the filename for your uploaded files
        cb(null, Date.now() + '-' + file.originalname);
    },
})
const uploadprofile = multer({ storage: storage });
router.post('/editprofile/:id', uploadprofile.single('profileImage'), userController.editProfile)



router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/profile', userController.editProfile);
router.get('/user/:id', authenticateUser, userController.getProfile);


module.exports = router;