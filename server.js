const express = require('express')  // Importing the express
const dotenv = require('dotenv')
const connectDb = require('./config/db')


//dot env configuration
dotenv.config()

//DB connection
connectDb()

const app = express()     // All the functionality of express is now in app

// Routing

app.use("/api/v1/test", require("./routes/testRoutes"))

app.get("/", (req, res) => {
    return res.status(200).send("<h1>Welcome to food server with taste</h1>")  // Fixed: added quotes around HTML string
})

const PORT = process.env.PORT

//Listen
app.listen(PORT, ()=>{
    console.log("Server is running hello ")
})