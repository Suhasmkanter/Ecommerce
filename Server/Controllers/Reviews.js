const Order = require("../Models/Order")
const Reviews = require("../Models/Review")

async function AddReview(req, res) {
    let { comment, reviewScore } = req.body
    let { userId, productId } = req.params
    console.log(comment, reviewScore)
    try {
        let data = await Reviews.create({ comment: comment, reviewScore: reviewScore, userId: userId, productId: productId })
        console.log(data);
        if (data) {
            return res.status(200).json({
                message: "The user Review is successfully added",
                success: true
            })
        } else {
            return res.status(404).json({
                message: "THere is something wrong is running here",
                success: false
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(504).json({
            success: false,

        })
    }
}
async function fetchallReview(req, res) {
    console.log(req.body)
    try {
        let data = await Reviews.find({ productId: req.body.productId })
        console.log(data, "hello");
        if (data) {
            return res.status(200).json({
                reviewData: data,
                message: "The user Reviews",
                success: true
            })
        } else {
            return res.status(404).json({
                message: "THere is something wrong is running here",
                success: false
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(504).json({
            success: false,

        })
    }



}


async function CheckUser(req, res, next) {
    let { userId, productId } = req.params
    console.log(req.body)
    if (!req.body.comment || !req.body.reviewScore) {
        return res.status(404).json({
            message: "The review should be present",
            success: false
        })
    }
    console.log(userId, productId, "Request for the reviews:")
    if (!userId) {
        return res.json({
            success: false,
            message: "Sorry we need the userId,productId"
        })
    }
    try {
        let data = await Order.find({ userId: userId })
        console.log(data)
        const Checking = data.some((items) => items.cartItems.some((items) => items.productId == productId))
        console.log(Checking)
        if (Checking) {

            next()
        } else {
            res.json({
                message: "You cant Give a Review to the Product",
                success: false
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(504).json({
            success: false,
            message: error.message
        })
    }



}

module.exports = { AddReview, CheckUser, fetchallReview }