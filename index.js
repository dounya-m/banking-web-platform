const express = require('express')
const cors = require("cors")
const colors = require("colors")
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes/router')
const {errorHandler} = require("./middleware/errorMiddleware")
const port = process.env.PORT || 3000

const app = express()
connectDB()
app.use(express.json())
app.use(router)


app.use(errorHandler)
app.listen(port, () =>{
    console.log(`I'm listning on port :${port}` .blue.underline);
});
