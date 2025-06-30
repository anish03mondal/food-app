const express = require('express')
const { getUserController, updateUserController, resetPasswordController, updateUserPasswordController, deleteProfileController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
    
//routes
//GET User || GET
router.get('/getUser', authMiddleware, getUserController)

//UPDATE PROFILE
router.put('/updateUser', authMiddleware, updateUserController)

//UPDATE PASSWORD
router.post('/updatePassword', authMiddleware, updateUserPasswordController)

//RESET PASSWORD
router.post('/resetPassword', authMiddleware, resetPasswordController)

//DELETE USER
router.delete('/deleteUser/:id', authMiddleware, deleteProfileController)


//export
module.exports = router