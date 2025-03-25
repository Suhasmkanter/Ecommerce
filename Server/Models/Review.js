const mongoose = require('mongoose')

const ReviewsSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    productId: {
        type: String
    },
    userName: {
        type: String
    },
    comment: {
        type: String
    },
    reviewScore: {
        type: Number
    }


})


let Reviews = mongoose.model("Reviews", ReviewsSchema)
module.exports = Reviews