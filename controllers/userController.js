const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")

// GET USER INFO
const getUserController = async (req, res)=>{
    try
    {
        //find user
        const user = await userModel.findById({_id:req.user.id})
        //validation
        if(!user)
        {
            return res.status(404).send({
                success: false,
                message: 'User Not found'
            })
        }

        //hiding  password
        user.password = undefined
        //sending response
        res.status(200).send({
            success: true,
            message: 'User get successfully',
            user
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Get user API',
            error
        })
    }

}

//UPDATE USER
const updateUserController = async (req, res)=>{
    try{
        //find user
        const user = await userModel.findById({_id: req.user.id})
        //validation
        if(!user)
        {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

        //update
        const {userName, address, phone} = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone

        //save user
        await user.save()
        res.status(200).send({
            success: true,
            message: "User updated successfully"
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updatad User API',
            error
        })
    }

}

//UPDATE USER PASSWORD
const updateUserPasswordController = async (req, res)=>{
    try{
        //find user
        const user = await userModel.findById({_id: req.user.id})
        //validation
        if(!user)
        {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        //get data from user
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword)
        {
            return res.status(500).send({
                success: false,
                message: 'Please provide old or new password'
            })
        }
        //check user password | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch)
        {
            return res.status(500).send({
            success: false,
            message: "Invalid old password"
            })
        }
        //hashing password
        var salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: 'Password Updated!'
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Password update API',
            error
        })
    }

}

//RESET PASSWORD
const resetPasswordController = async (req, res)=>{
    try{
        const {email, newPassword, answer} = req.body
        //validation
        if(!email || !newPassword || !answer)
        {
            res.status(500).send({
                success: false,
                message: 'Please provide all the fields'
            })
        }
        const user = await userModel.findOne({email, answer})
        if(!user)
        {
            return res.status(500).send({
                success: false,
                message: 'User not found or Invalid answer'
            })
        }
        //hashing password
        var salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        await user.save()
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in password RESET API',
            error
        })
    }

}

//DELETE PROFILE ACCOUNT
const deleteProfileController = async (req, res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: 'Your accout has been deleted'
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in delete profile api',
            error
        })
    }

}

module.exports = {
    getUserController, 
    updateUserController,
    updateUserPasswordController,
    resetPasswordController,
    deleteProfileController
}