const mongoose = require('mongoose')

const CartsDetails = new mongoose.Schema({
    Userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    items: [{
        ProductId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductDetails',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1

        }

    }

    ]
}




)


const Cartsdetails = mongoose.model('Cartdetails', CartsDetails)
module.exports = Cartsdetails