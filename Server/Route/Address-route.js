const express = require('express')
const { fetchAddress, addAddress, editAddress, deleteAddress } = require('../Controllers/Address-controller')
const Router = express.Router()


Router.post('/Create', addAddress)
Router.get('/fetch', fetchAddress);
Router.put('/edit/:userId/:addressId', editAddress)
Router.delete('/delete/:userId/:addressId', deleteAddress)




module.exports = Router