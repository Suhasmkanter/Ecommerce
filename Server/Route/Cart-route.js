const express = require('express')

const { FetchCartitem, UpdatetoCart, AddtoCart, DeletetoCart, } = require('../Controllers/Cart')
const router = express.Router()
router.post('/add', AddtoCart);
router.get('/get/:Userid', FetchCartitem)
router.put('/update-cart', UpdatetoCart)
router.delete('/:Userid/:ProductId', DeletetoCart)
module.exports = router