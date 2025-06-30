const restaurantModel = require("../models/restaurantModel")

//CREATE RESTAURANT
const createRestaurantController = async (req, res)=>{
    try{
        const {
            title,
            imageUrl,
            food,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        } = req.body

        //validation
        if(!title || !coords)
        {
            return res.status(500).send({
                success: false,
                message: 'Please provide title or address'
            })
        }

        const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            food,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        })
        await newRestaurant.save()

        res.status(201).send({
            success: true,
            message: "New Resataurant created successfully"
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create Resataurant API",
            error
        })
    }

}

//GET ALL RESTAURANTS
const getAllRestaurantController = async (req, res)=>{
    try{
        const restaurants = await restaurantModel.find({})
        if(!restaurants)
        {
            return res.status(404).send({
                success: false,
                message: 'No Resataurant Available'
            })
        }
        res.status(200).send({
            success: true,
            totalCount: restaurants.length,
            restaurants
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting all Resataurant API',
            error
        })
    }

}

//GET RESTAURANT BY ID
const getRestaurantByIdController = async (req, res)=>{
    try{
        const restaurantId = req.params.id
        if(!restaurantId)
        {
            return res.status(404).send({
                success: false,
                message: 'Please provide Restaurant Id'
            })
        }
        //find restaurant
        const restaurant = await restaurantModel.findById(restaurantId)
        if(!restaurant)
        {
            return res.status(404).send({
                success: false,
                message: 'No restaurant found'
            })
        }

        res.status(200).send({
            success: true,
            message: 'Restaurant fetched successfully',
            restaurant
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting Restaurant by Id api',
            error
        })    
    }

}


//exports
module.exports = {
    createRestaurantController,
    getAllRestaurantController,
    getRestaurantByIdController,
}