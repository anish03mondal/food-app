const userModel = require("../models/userModel")

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

module.exports = {getUserController, updateUserController}