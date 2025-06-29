const express = require('express')
const { registerController, loginController } = require('../controllers/authController')

const router = express.Router()     //used for route handiling only

//routes
//Register || POST
router.post('/register', registerController)

//Login || POST
router.post('/login', loginController)


//export
module.exports = router