const express = require('express')

const authMiddleware = require('../middlewares/authMiddleware')
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController')
const adminMiddlewares = require('../middlewares/adminMiddlewares')

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

//PLACE ORDER
router.post('/placeorder', authMiddleware, placeOrderController)

//ORDER STATUS
router.post('/orderStatus/:id', adminMiddlewares, orderStatusController)




//export
module.exports = router