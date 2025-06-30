const express = require('express')
const { getUserController, updateUserController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()
    
//routes
//GET User || GET
router.get('/getUser', authMiddleware, getUserController)

//UPDATE PROFILE
router.put('/updateUser', authMiddleware, updateUserController)


//export
module.exports = router