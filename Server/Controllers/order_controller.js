const paypal = require('../helpers/payment')
const Cartsdetails = require('../Models/Cart')
const Order = require('../Models/Order')
const ProductDetails = require('../Models/ProductDetails')
async function createorder(req, res) {
    console.log('request bodies', req.body)
    try {

        let {
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId
        } = req.body
        console.log("CartCreations form here", cartItems)

        const create_payment_options = {
            intent: "sale",
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shop/paypal_returnpage',
                cancel_url: 'http://localhost:5173/shop/paypal_cancelpage',

            },
            transactions: [{
                item_list: {
                    items: cartItems.map(item => ({
                        name: item.name,
                        sku: item.productId,
                        price: item.price.toFixed(2), // Ensure price is a string with 2 decimals
                        quantity: item.quantity,
                        currency: "USD"
                    }))
                },
                amount: {
                    currency: 'USD',
                    total: totalAmount.toFixed(2)
                },
                description: "Ecommerce order payment"
            }]
        }
        paypal.payment.create(create_payment_options, async (error, paymentinfo) => {
            if (error) {
                console.log(error)
                res.status(404).json({
                    error: error.details,
                    message: "The payment is failed"
                })
            } else {
                const newlyOrder = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId
                })
                await newlyOrder.save()
                const approvalURL = paymentinfo.links.find(link => link.rel === 'approval_url').href
                res.status(220).json({
                    success: true,
                    approvalURL,
                    orderId: newlyOrder._id

                })
            }
        })



    } catch (error) {
        console.log(error.message)
        res.status(504).json({
            success: false,
            message: error.message
        })
    }
}

async function captureOrder(req, res) {
    console.log(req.body)
    const {
        payerId,
        paymentId,
        orderId
    } = req.body
    try {
        const order = await Order.findById(orderId)
        if (!order) {
            return res.json({
                success: false,
                message: "There is no Order is created"
            })
        }
        order.payerId = payerId
        order.paymentId = paymentId
        console.log(order.cartId)
        order.orderStatus = 'confirmed'

        console.log(order)
        for (let objects of order.cartItems) {
            const data = await ProductDetails.findByIdAndUpdate(objects.productId, {
                $inc: { Stocks: -objects.quantity }
            }, { new: true })
            console.log(data)
        }



        await Cartsdetails.findByIdAndDelete({ _id: order.cartId })

        await order.save()

        res.json({
            success: true,
            message: "The order is successfully placed bro  good luck"
        })


    } catch (error) {
        console.log(error.message)
        res.status(504).json({
            success: false,
            message: error.message
        })

    }
}

async function getAllOrders(req, res) {
    let { userId } = req.params
    console.log("userid you dont know", userId)
    try {
        let data = await Order.find({ userId: userId })
        console.log(data)
        if (!data) {
            return res.json({
                success: false,
                message: 'There is no Order to send '


            })

        }
        return res.json({
            success: true,
            data: data
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: "there is some error in the Server"
        })
    }
}

async function getOrdersById(req, res) {
    let { id } = req.params
    try {
        let data = await Order.find({ _id: id })
        if (data) {
            return res.json({
                success: false,
                message: 'There is no Order to send '

            })
            return res.json({
                success: true,
                data: data
            })
        }

    } catch (error) {
        console.log(error.message)
        res.json({
            success: false,
            message: "there is some error in the Server"
        })
    }
}


module.exports = {
    createorder,
    captureOrder,
    getAllOrders,
    getOrdersById
}