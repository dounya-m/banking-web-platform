const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        require: [true, 'Please enter your name'],
    },
    lastname:{
        type: String,
        require: [true, 'Please enter your lastname'],
    },    
    email:{
        type: String,
        unique: true,
        require: [true, 'Please enter your email'],
    },
    adress:{
        type: String,
        require: [true, 'Please enter your adress'],
    },
    city:{
        type: String,
        require: [true, 'Please enter your city'],
    },
    codeP:{
        type: String,
        require: [true, 'Please enter your codeP'],
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
module.exports = mongoose.model('User', userSchema)