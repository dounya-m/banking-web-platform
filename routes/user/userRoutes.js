const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
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

module.exports = router