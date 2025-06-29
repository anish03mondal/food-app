const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const cors = require('cors')
const morgan = require('morgan')

// Initialize express app first
const app = express();

// Middleware setup
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


// dotenv configuration
dotenv.config();

// DB connection
connectDb();

// Routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));

// Test route
app.get("/", (req, res) => {
    return res.status(200).send("<h1>Welcome to food server with taste</h1>");
});

const PORT = process.env.PORT || 8080; // Added fallback port

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});