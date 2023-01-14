const express = require('express')
const router = express.Router()
const Compte = require('../../schema/compte/comptSchema')

router.get('/', async(req , res) =>{
    const compte = await Compte.find()
    res.status(200).json(compte)
})

router.post('/', async(req, res) =>{
    try{
        const {user, amount} = req.body
        !user || ! amount ? res.status(400).json({message: 'the text is reuired'}):''
        const compt = await Compte.create({
            user, amount
        })
        await compt.save()
        res.json(compt)
        }catch(err){
            res.status(500).send(err)
    }
})

module.exports = router