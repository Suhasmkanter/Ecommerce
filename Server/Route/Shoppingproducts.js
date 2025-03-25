const express = require('express')
const { Shopproducts, getProductById } = require('../Controllers/Shoppingproducts')
const Router = express.Router()



Router.get('/Allproducts', Shopproducts)
Router.get('/products/:id', getProductById)





module.exports = Router