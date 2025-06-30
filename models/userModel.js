const mongoose = require('mongoose')  // mongoose is also used to create schema

//schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'user name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, 'phone number is required']
    },
    usertype: {
        type: String,
        required: [true, 'usertypeis is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://www.freepik.com/free-photos-vectors/single-user',
    },
    answer: {
        type: String,
        require: [true, 'Answer is required']
    }

},{timstamps: true})

//export
module.exports = mongoose.model("User", userSchema)
