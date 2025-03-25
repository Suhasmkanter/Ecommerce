const ProductDetails = require("../Models/ProductDetails")

async function Fetchalltheitems(req, res) {
    console.log(req.params)
    const { keyword } = req.params
    if (!keyword) {
        return res.json({
            success: false,
            message: "There is no keyword which is named has a undefined "
        })
    }
    try {
        let data = await ProductDetails.find({
            $or: [
                { Productname: { $regex: new RegExp(keyword, "i") } },
                { Category: { $regex: new RegExp(keyword, "i") } },
                { Brand: { $regex: new RegExp(keyword, "i") } }


            ]
        })
        console.log(data, "SearchItems")

        if (data) {
            return res.status(202).json({
                success: true,
                items: data
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(504).json({
            success: false,
            message: "There is some error is present"
        })
    }


}
module.exports = { Fetchalltheitems }