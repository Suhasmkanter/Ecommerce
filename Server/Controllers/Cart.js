const Cartdetails = require('../Models/Cart')
const ProductDetails = require('../Models/ProductDetails')

const AddtoCart = async (req, res) => {
    try {
        let { Userid, ProductId, quantity } = req.body
        console.log(Userid, ProductId, quantity)
        if (!Userid || !ProductId || quantity <= 0) {
            return res.json({
                success: false,
                message: "The values are insufficient"
            })
        }
        let product = await ProductDetails.findOne({ _id: ProductId })
        if (!product) {
            return res.json({
                success: false,
                message: "Product Not Found"
            })
        }
        let cart = await Cartdetails.findOne({ Userid })
        if (!cart) {
            cart = new Cartdetails({ Userid, items: [] })
        }
        let findcurrentproductindex = cart.items.findIndex(
            (items) => items.ProductId.toString() === ProductId
        )
        if (findcurrentproductindex === -1) {
            cart.items.push({ ProductId, quantity })
        } else {
            cart.items[findcurrentproductindex].quantity += quantity
        }
        await cart.save()
        if (cart) {
            return res.status(200).json({
                success: true,
                message: "THe Product is Successfully added to the Cart",
            })
        }

    } catch (error) { }
}

const FetchCartitem = async (req, res) => {
    console.log(req.params)
    try {
        let { Userid } = req.params
        console.log(Userid)
        if (!Userid) {
            return res.json({
                success: false,
                message: "The values are insufficient"
            })
        }
        let cart = await Cartdetails.findOne({ Userid }).populate({
            path: 'items.ProductId',
            select: 'Productname ImagesUrl Brand Category Saleprice Size Discountprice Stocks'
        })
        if (cart) {
            const validItems = cart ? cart.items.filter(productitem => productitem.ProductId) : []
            if (validItems.length < cart.items.length) {
                cart.items = validItems
                await cart.save()
            }
            const populateCartItems = validItems.map((items) => {
                return ({
                    ProductId: items.ProductId._id,
                    image: items.ProductId.ImagesUrl,
                    title: items.ProductId.Productname,
                    price: items.ProductId.Saleprice,
                    Discountprice: items.ProductId.Discountprice,
                    stocks: items.ProductId.Stocks,
                    quantity: items.quantity
                })
            })
            console.log()
            populateCartItems.cartId = cart._id
            return res.status(200).json({
                success: true,
                message: "THe Product is Successfully added to the Cart",
                data: {
                    ...cart._doc,
                    items: populateCartItems
                }
            })
        }




    } catch (error) {
        console.log(error)
    }
}
const UpdatetoCart = async (req, res) => {

    try {
        const { Userid, ProductId, quantity } = req.body;
        if (!Userid || !ProductId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }
        const cart = await Cartdetails.findOne({ Userid });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }
        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.ProductId.toString() === ProductId
        );
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Cart item not present !",
            });
        }
        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();
        await cart.populate({
            path: "items.ProductId",
            select: "ImagesUrl Productname Discountprice Saleprice  ",
        });
        const populateCartItems = cart.items.map((item) => ({
            Productname: item.ProductId.Productname,
            ImagesUrl: item.ProductId.ImagesUrl ? item.ProductId.ImagesUrl : null,
            Saleprice: item.ProductId.Saleprice ? item.ProductId.Saleprice : null,
            Discountprice: item.ProductId.Discountprice ? item.ProductId.Discountprice : null,
            quanitty: item.quantity

        }));

        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
const DeletetoCart = async (req, res) => {
    console.log(req.params)
    try {
        const { Userid, ProductId } = req.params;
        if (!Userid || !ProductId) {
            console.log("there is no one here ")
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }
        const cart = await Cartdetails.findOne({ Userid }).populate({
            path: "items.ProductId",
            select: "ImagesUrl Productname Discountprice Saleprice",
        });

        console.log(cart)

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }

        cart.items = cart.items.filter(
            (item) => item.ProductId._id.toString() !== ProductId
        );

        await cart.save();

        await cart.populate({
            path: "items.ProductId",
            select: "ImagesUrl Productname Discountprice Saleprice",
        });
        console.log(cart)

        const populateCartItems = cart.items.map((item) => ({
            productId: item.ProductId ? item.ProductId._id : null,
            image: item.ProductId ? item.ProductId.ImagesUrl : null,
            title: item.ProductId ? item.ProductId.Productname : "Product not found",
            price: item.ProductId ? item.ProductId.Saleprice : null,
            salePrice: item.ProductId ? item.ProductId.Discountprice : null,
            quantity: item.quantity,
        }));
        console.log(populateCartItems)

        return res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }

}
module.exports = {
    AddtoCart,
    FetchCartitem,
    DeletetoCart,
    UpdatetoCart
}