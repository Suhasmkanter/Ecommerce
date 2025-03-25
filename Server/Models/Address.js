const mongoose = require('mongoose')


const addressSchema = mongoose.Schema({
    userId: String,
    address: String,
    pincode: String,
    city: String,
    phone: String,
    notes: String
}, { timestamps: true })


const AddressModel = mongoose.model("Address", addressSchema)
module.exports = { AddressModel }