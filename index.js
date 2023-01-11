const express = require('express')
const cors = require("cors")
const colors = require("colors")
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 3000


const app = express()
connectDB()
app.listen(port, () =>{
    console.log(`I'm listning on port :${port}` .blue.underline);
})
