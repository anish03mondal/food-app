const mongoose = require('mongoose')        //mongoose define schemas and models and establish connection with mongodb

//function of mongodb database connection
const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database ${mongoose.connection.host}`)
    }
    catch(error)
    {
        console.log("DB error", error)
    }
}

module.exports = connectDb