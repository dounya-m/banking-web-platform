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
router.put('/retrait/:id', async(req, res) =>{

    const amountN = await Compte.findById(req.params.id)
    const current = amountN.amount
    const newAmount = parseInt(current) - parseInt(req.body.amount)
    const updateCompt = await Compte.findByIdAndUpdate(req.params.id, {
        amount: newAmount,
        new: true,
    })
    res.json(updateCompt)
})
router.put('/depot/:id', async(req, res) =>{

    const amountN = await Compte.findById(req.params.id)
    const current = amountN.amount
    const newAmount = parseInt(current) + parseInt(req.body.amount)
    const updateCompt = await Compte.findByIdAndUpdate(req.params.id, {
        amount: newAmount,
        new: true,
    })
    res.json(updateCompt)
})
// router.get('/userAcc/:user', async(req, res) => {
//     const acount = await Compte.findOne(req.params.user)
//     res.json(acount)
// })

module.exports = router