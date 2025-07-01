const foodModel = require("../models/foodModel")
const orderModel = require("../models/orderModel")

//CREATE FOOD
const createFoodController = async (req, res)=>{
    try{
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount
        } = req.body

        if(!title || !description || !price || !restaurant)
        {
            return res.status(500).send({
                success: false,
                message: 'Please provide all the necessary details'
            })
        }
        const newFood = new foodModel({ 
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount})

        await newFood.save()
        res.status(201).send({
            success: true,
            message: 'New food item is created',
            newFood
        })
        
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in creating food API'.
            error
        })
    }

}

//GET ALL FOODS
const getAllFoodController = async (req, res)=>{
    try{
        const foods = await foodModel.find({})
        if(!foods)
        {
            return res.status(404).send({
                success: false,
                message: 'No food item was found'
            })
        }
        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting all food API',
            error
        })
    }

}

//GET SINGLE FOOD CONTROLLER
const getSingleFoodController = async (req, res)=>{
    try{
        const foodId = req.params.id
        if(!foodId)
        {
            return res.status(404).send({
                success: false,
                message: 'Please provide id'
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food)
        {
            return res.status(404).send({
                success: false,
                message: 'No food item with this id'
            })
        }
        res.status(200).send({
            success: true,
            food
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting single food API',
            error
        })
    }

}

//GET FOOD BY RESTAURANT
const getFoodByRestaurantController = async (req, res)=>{
    try{
        const restaurantId = req.params.id
        if(!restaurantId)
        {
            return res.status(404).send({
                success: false,
                message: 'Please provide id'
            })
        }
        const food = await foodModel.find({restaurant: restaurantId})
        if(!food)
        {
            return res.status(404).send({
                success: false,
                message: 'No food item with this id'
            })
        }
        res.status(200).send({
            success: true,
            food
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting single food API',
            error
        })
    }

}

//UPDATE FOOD ITEM
const updateFoodController = async (req, res)=>{
    try{
        const foodID = req.params.id
        if(!foodID)
        {
            res.status(404).send({
                success: false,
                message: 'No id was found'
            })
        }
        const food = await foodModel.findById(foodID)
        if(!food)
        {
            return res.status(404).send({
                success: false,
                message: 'No food was found'
            })
        }

        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount
        } = req.body
        const updatedFood = await foodModel.findByIdAndUpdate(
            foodID,
            {title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount},
            {new: true}
        )

        res.status(200).send({
            success: true,
            message: 'Food item was updated'
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating food API',
            error
        })
    }

}

//DELETE FOOD
const deleteFoodController = async (req, res)=>{
    try{
        const foodId = req.params.id
        if(!foodId)
        {
            return res.status(404).send({
                success: false,
                message: 'Provide food id'
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food)
        {
            return res.status(404).send({
                success: false,
                message: 'No food with the given id'
            })
        }
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success: true,
            message: "Food item deleted"
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in deleting food API',
            error
        })
    }

}

//PLACE ORDER
const placeOrderController = async (req, res)=>{
    try{
        const {cart} = req.body
        if(!cart)
        {
            return res.status(500).send({
                success: false,
                message: 'Provide card or payment method'
            })
        }
        let total = 0
        //calculate total price
        cart.map((i) => {
            total += i.price
        })

        const newOrder = new orderModel({
            foods: cart,
            buyer: req.body.id
        })
        

        res.status(201).send({
            success: true,
            message: "Order placed successfully",
            newOrder
        })
        

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in place order API',
            error
        })
    }

}

//CHANGE ORDER STATUS
const orderStatusController = async(req, res)=>{
    try{
        const orderId = req.params.id
        if(!orderId)
        {
            return res.status(404).send({
                success: false,
                message: 'Please provide valid user id'
            })
        }
        const {status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId, {status}, {new: true})
        res.status(200).send({
            success: true,
            message: 'Order status updated'
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in order status API',
            error
        })
    }

}


//export
module.exports = {
    createFoodController,
    getAllFoodController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController,
}