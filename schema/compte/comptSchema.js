const mongoose = require('mongoose')
const Schema = mongoose.Schema

const compteSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: [true, 'please enter the user id'],
        ref: 'User'
    },
    amount:{
        type: String,
        require: [true, 'please enter your sold']
    }

},
{
    timestamps: true
}
)
module.exports = mongoose.model('Compte', compteSchema)