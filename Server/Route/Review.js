const express = require('express')
const { Shopproducts, getProductById } = require('../Controllers/Shoppingproducts')
const { CheckUser, AddReview, fetchallReview } = require('../Controllers/Reviews')
const Router = express.Router()



Router.post('/:userId/:productId', CheckUser, AddReview)

Router.post('/fetchall', fetchallReview)




module.exports = Router