const express = require('express')
const { createorder, captureOrder, getAllOrders, getOrdersById } = require('../Controllers/order_controller')
const router = express.Router()
router.post('/create', createorder)

router.post('/capture', captureOrder)

router.get('/list/:userId', getAllOrders)

router.get('/detail/:id', getOrdersById)

module.exports = router