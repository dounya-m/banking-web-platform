const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminSchema = new Schema({
    name:{
        type: String,
        require: [true, 'Please enter your name'],
    },   
    email:{
        type: String,
        unique: true,
        require: [true, 'Please enter your email'],
    },
    password:{
        type: String,
        require: [true, 'Please enter your password'],
    },
},
    {
        timestamps:true
    }
)
module.exports = mongoose.model('Admin', adminSchema)