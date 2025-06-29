const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

//REGISTER
const registerController = async (req, res)=>{
    try{
        const {userName, email, password, phone, address} = req.body     //extracting usename email pas....from req.body
        //validation
        if(!userName || !email || !password || !address || !phone)
        {
            return res.status(500).send({
                success: false,
                message: 'Please provide all the fields'
            })
        }

        //check user
        const existing = await userModel.findOne({email})
        if(existing)
        {
            return res.status(500).send({
                success: false,
                message: 'Email already registered please login'
            })
        }

        //hashing password
        var salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create user
        const user = await userModel.create({
            userName, 
            email, 
            password: hashedPassword, 
            address, 
            phone
        })

       

        res.status(201).send({
            success: true,
            message: 'Successfully Registered',
            user
            
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in register API',
            error
        })
    }

}

//LOGIN
const loginController = async (req,res)=>{
    try{
        const {email, password} = req.body
        //Validation
        if(!email || !password)
        {
            return res.status(500).send({
                success: false,
                message: 'Please provide email or password'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user)
        {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

         //check user password | compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
        {
            return res.status(500).send({
                success: false,
                message: "Invalid credential"
            })
        }

        //token
        const token = JWT.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })

        user.password = undefined
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            token,
            user
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in logic API',
            error
        })
    }

}

//export
module.exports = {registerController, loginController}