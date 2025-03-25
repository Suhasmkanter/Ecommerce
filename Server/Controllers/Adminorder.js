const Order = require("../Models/Order")

async function getAllOrdersForAdmin(req, res) {

    try {
        let data = await Order.find({})
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
async function getOrdersByIdForAdmin(req, res) {
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

async function UpdatetheProduct(req, res) {
    const { id } = req.params
    const { status } = req.body
    console.log(id, status)
    try {
        const Orders = await Order.updateOne({ _id: id }, {
            $set: {
                orderStatus: status
            }
        }, { new: true })
        console.log(Orders)
        if (Orders) {
            res.status(202).json({
                success: true,
                message: "The data is successfully updated here Okay     "
            })
        }
    } catch (error) {
        res.status(504).json({
            success: false,
            message: "There is something wrong in the Server"
        })
    }

}
module.exports = {
    getAllOrdersForAdmin,
    getOrdersByIdForAdmin,
    UpdatetheProduct
}