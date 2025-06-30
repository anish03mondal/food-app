const categoryModel = require("../models/categoryModel")

//CREATE CATEGORY
const createCatController = async (req, res)=>{
    try{
        const {title, imageUrl} = req.body
        //validation
        if(!title)
        {
            return res.status(500).send({
                success: false,
                message: 'Please provide category title or image'
            })
        }

        const newCategory = new categoryModel({title, imageUrl})
        await newCategory.save()
        res.status(201).send({
            success: true,
            message: "Category created",
            newCategory
        })

    }
    catch(error)
    {
        return res.status(500).send({
            success: false,
            message: 'Error in creating category API',
            error
        })
    }

}


//exports
module.exports = {createCatController}