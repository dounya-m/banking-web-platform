const express = require('express')
const router = express.Router()
const Compte = require('../../schema/compte/comptSchema')

router.get('/', async(req , res) =>{
    const compte = await Compte.find()
    res.status(200).json(compte)
})

// router

module.exports = router