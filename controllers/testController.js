const testUserController = (req, res)=>{

    try{
        res.status(200).send("test user data")
    }
    catch(error)
    {
        console.log("Error in test api", error)
    }

}

module.exports = {testUserController}