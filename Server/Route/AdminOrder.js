const express = require('express')
const { getAllOrdersForAdmin, getOrdersByIdForAdmin, UpdatetheProduct } = require('../Controllers/Adminorder')
const router = express.Router()


router.get('/list', getAllOrdersForAdmin)

router.get('/detail/:id', getOrdersByIdForAdmin)
router.post("/update/:id", UpdatetheProduct)
module.exports = router