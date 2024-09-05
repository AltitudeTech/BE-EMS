const express = require('express');
const { getSettings,createRolePermission,logout,updatePassword } = require('../controllers/settingController');
const {auth,isAdmin} = require('../middlewares/auth');
const router = express.Router();


router.post('/role',isAdmin,createRolePermission);
router.post('/logout',auth, logout);
router.put('/profile/change-password',auth, updatePassword);
router.put('/:userId/update-picture')
router.get('/:userId'/*,auth*/, getSettings);



module.exports = router;
