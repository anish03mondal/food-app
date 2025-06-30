const express = require('express')
const { getUserController, updateUserController, resetPasswordController, updateUserPasswordController, deleteProfileController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController } = require('../controllers/restaurantController')

const router = express.Router()
    
//routes
//CREATE RESTAURANT || POST
router.post('/create', authMiddleware, createRestaurantController)

//GET ALL RESTAURANTS
router.get("/getAll", getAllRestaurantController)

//GET RESTAURANT BY ID || GET
router.get('/get/:id', getRestaurantByIdController)



//export
module.exports = router