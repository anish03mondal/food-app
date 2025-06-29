const express = require('express')
const { testUserController } = require('../controllers/testController')

//Creating router object
const router = express.Router() 

//Routes GET || POST || UPDATE || DELETE
router.get('/test-user', testUserController)


//export
module.exports = router