const foodModel = require("../models/foodModel")

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


//export
module.exports = {
    createFoodController,
    getAllFoodController,
    getSingleFoodController,
    getFoodByRestaurantController,
    updateFoodController,
    deleteFoodController,
}