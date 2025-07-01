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

//GET ALL CATEGORY
const getAllCatController = async (req, res)=>{
    try{
        const categories = await categoryModel.find({})
        if(!categories)
        {
            return res.status(404).send({
                success: false,
                message: 'No category found'
            })
        }
        res.status(200).send({
            success: true,
            totalCat: categories.length,
            categories
        })

    }
    catch(error)
    {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in getting all category',
            error
        })
    }

}

//UPDATE CATEGORY
const updateCatController = async (req, res)=>{
    try{
        const {id} = req.params
        const {title, imageUrl} = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            {title, imageUrl},
            {new: true},
        )
        if(!updatedCategory)
        {
            return res.status(500).send({
                success: false,
                message: "No category found",
            })
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully"
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating category api',
            error
        })
    }

}

//DELETE CATEGORY
const deleteCatController = async (req, res)=>{
    try{
        const {id} = req.params
        if(!id)
        {
            return res.status(500).send({
                success: false,
                message: 'Please provide category ID'
            })
        }
        const category = await categoryModel.findById(id)
        if(!category)
        {
            return res.status(500).send({
                success: false,
                message: 'No category found with this id'
            })
        }

        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully'
        })

    }
    catch(error)
    {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in deleting category API",
            error
        })
    }

}


//exports
module.exports = {
    createCatController, 
    getAllCatController,
    updateCatController,
    deleteCatController,
}