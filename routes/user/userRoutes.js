const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../../schema/user/userSchema")

router.get('/', async(req, res) =>{
    const user = await User.find()
    res.status(200).json(user)
})

router.post('/', async(req,res) =>{
    try{
        const {name, lastname, email, adress, city, codeP, password} = req.body
        if(!name || !lastname || !email || !adress || !city || !codeP || !password){
            res.status(400).json({message: 'text is required'})
        }
        const user = await User.create({
            name,
            lastname,
            email,
            adress,
            city,
            codeP,
            password
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()
        res.json(user)
    }catch(err){
        res.status(500).send(err)
    }
})

router.post('/login', async(req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400).json({message: 'Please enter your email or passord'})
    }
    const user = await User.findOne({email})
    if(!user){
        res.status(400)
        Error('User Not found')
    }
    if(user && ( await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            adress: user.adress,
            city: user.city,
            codeP: user.codeP,
            token: generateToken(user._id)
        })
    }else{
        res.status(401).json("Wrong Credentials")
    }

})

const generateToken  = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '1d'
    })
}

module.exports = router