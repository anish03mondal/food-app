const mongoose = require('mongoose')  // mongoose is also used to create schema

//schema
const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'food title is required']
    },
    description: {
        type: String,
        required: [true, 'food description is required']
    },
    price: {
        type: Number,
        required: [true, 'food price is required']
    },
    imageUrl: {
        type: String,
        default: 'https://www.freepik.com/free-photos-vectors/single-user',
    },
    foodTags: {
        type: String,
    },
    category: {
        type: String,
    },
    code: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    rating: {
        type: Number,
        default: 5,
        max: 5,
        min: 1
    },
    ratingCount: {
        type: String
    },

},{timstamps: true})

//export
module.exports = mongoose.model("Foods", foodSchema)
