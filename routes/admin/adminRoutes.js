const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require("../../schema/admin/adminSchema")

router.get('/', async(req, res) =>{
    const admin = await Admin.find()
    res.status(200).json(admin)
})

router.post('/', async(req,res) =>{
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password){
            res.status(400).json({message: 'text is required'})
        }
        const admin = await Admin.create({
            name,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10)
        admin.password = await bcrypt.hash(admin.password, salt)
        await admin.save()
        res.json(admin)
    }catch(err){
        res.status(500).send(err)
    }
})

router.post('/login', async(req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400).json({message: 'Please enter your email or password'})
    }
    const admin = await Admin.findOne({email})
    if(!admin){
        res.status(400)
        Error('admin Not found')
    }
    if(admin && ( await bcrypt.compare(password, admin.password))){
        res.status(200).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
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