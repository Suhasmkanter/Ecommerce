const express = require('express')
const { CreateProducts, FetchAllProducts, EdittheProducts } = require('../Controllers/ProductControllers')
const Router = express.Router()


Router.post('/Newproduct', CreateProducts)
Router.get('/fetchproducts', FetchAllProducts)
Router.post('/edit-product', EdittheProducts)


module.exports = Router