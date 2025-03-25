const mongoose = require('mongoose')

const Details = new mongoose.Schema({
    Productname: {
        type: String,
        required: true,
    },
    ProductDescription: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    ImagesUrl: {
        type: String,
        required: true
    },
    Saleprice: {
        type: Number,
        required: true
    },
    Discountprice: {
        type: Number,
        required: true

    },
    Category: {
        type: String,
        required: true
    },
    Brand: {
        type: String,
        required: true
    },
    Size: {
        type: [String],
    },
    Stocks: {
        type: Number
    }

})

const ProductDetails = mongoose.model('ProductDetails', Details)
module.exports = ProductDetails