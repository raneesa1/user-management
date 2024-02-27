const express = require('express');
const router = express.Router();
const adminController = require('../controller/admincontroller');
const validateToken = require('../middleware/jwt');




router.get('/userDetails', adminController.getUser)
router.delete("/delete/:id", adminController.deleteUser);
router.post("/adduser", adminController.addUser);
router.post('/edituser/:id', adminController.editUser);



module.exports = router;