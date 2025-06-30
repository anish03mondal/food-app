const mongoose = require('mongoose')  // mongoose is also used to create schema

//schema
const categorySchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: [true, "Category title is required"]
    },
    imageUrl: {
        type: String,
        default: "https://pngtree.com/so/food-logo"
    }
    

},{timstamps: true})

//export
module.exports = mongoose.model("Category", categorySchema)
