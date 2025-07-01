const express = require('express')

const authMiddleware = require('../middlewares/authMiddleware')
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController } = require('../controllers/foodController')

const router = express.Router()
    
//routes
//CREATE FOOD
router.post('/create', authMiddleware, createFoodController)

//GET ALL FOOD
router.get('/getAll', getAllFoodController)

//GET SINGLE FOOD
router.get('/get/:id', getSingleFoodController)

//GET FOOD BY RESTAURANT
router.get('/getByRestaurant/:id', getFoodByRestaurantController)

//UPDATE FOOD
router.put('/update/:id', authMiddleware, updateFoodController)

//DELETE FOOD
router.delete('/delete/:id', authMiddleware, deleteFoodController)




//export
module.exports = router