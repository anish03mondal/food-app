const userModel = require("../models/userModel")

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

        //create user
        const user = await userModel.create({
            userName, email, password, address, phone
        })
        res.status(201).send({
            success: true,
            message: 'Successfully Registered'
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

//export
module.exports = {registerController}