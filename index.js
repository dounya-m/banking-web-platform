const express = require('express')
const cors = require("cors")
const colors = require("colors")
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const {errorHandler} = require("./middleware/errorMiddleware")
const port = process.env.PORT || 3000
const base = '/api/banka/'


const app = express()
connectDB()
app.use(express.json())


app.use(`${base}user`, require('./routes/user/userRoutes'))
app.use(`${base}compte`, require('./routes/compte/compteRoute'))

app.use(errorHandler)
app.listen(port, () =>{
    console.log(`I'm listning on port :${port}` .blue.underline);
});
