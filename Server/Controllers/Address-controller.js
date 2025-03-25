const { AddressModel } = require('../Models/Address')
const addAddress = async (req, res) => {
    console.log(req.body)
    let { userId, address, pincode, city, phone, notes } = req.body
    if (!userId || !address || !city || !phone || !pincode) {
        return res.json({
            message: "Please correctly Fill the Formbox ",
            success: false
        })
    }
    try {
        let data = await AddressModel.create({ userId, address, pincode, city, phone, notes })
        if (data) {
            return res.json({
                message: "The Address is successfully Stored",
                success: true
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            success: false
        })
    }
}
const fetchAddress = async (req, res) => {
    try {
        let data = await AddressModel.find({})
        if (data) {
            return res.json({
                data: data,
                success: true
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error is their",
            error: error.message,
            success: false
        })
    }
}

const editAddress = async (req, res) => {
    let { userId, addressId } = req.params
    let { formdata } = req.body
    try {
        let data = await AddressModel.findOneAndUpdate({
            userId: userId,
            _id: addressId
        },
            formdata, { new: true })
        if (data) {
            return res.json({
                message: "The values are successfully Edited"
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Error is Present",
            error: error.message
        })
    }
}

const deleteAddress = async (req, res) => {
    let { userId, addressId } = req.params
    console.log(userId, addressId)
    try {
        let data = await AddressModel.deleteOne({ userId: userId, _id: addressId })
        console.log(data)
        if (data) {
            return res.json({
                success: true,
                message: 'The Address is Successfully Deleted '
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error",
            error: error.message,
            success: false
        })
    }

}

module.exports = {
    addAddress,
    fetchAddress,
    editAddress,
    deleteAddress
}