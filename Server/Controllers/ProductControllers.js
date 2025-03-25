const ProductDetails = require('../Models/ProductDetails')

async function CreateProducts(req, res) {
    console.log(req.body)
    let {
        Productname,
        ProductDescription,
        ProductOriginalPrice,
        ProductDiscountPrice,
        ProductImageUrl,
        Gender,
        ProductSize,
        ProductCategory,
        ProductBrand,
        ProductStocks
    } = req.body
    try {

        const newproducts = new ProductDetails({
            Productname,
            ProductDescription,
            Gender,
            ImagesUrl: ProductImageUrl,
            Saleprice: ProductOriginalPrice,
            Discountprice: ProductDiscountPrice,
            Category: ProductCategory,
            Brand: ProductBrand,
            Size: ProductSize,
            Stocks: ProductStocks
        })
        newproducts.save()
        console.log(newproducts)
        res.json({
            success: true,
            message: 'The product is successfully registered bro '
        })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            textL: "There is somethinng Wrong  "
        })
    }



}

async function FetchAllProducts(req, res) {
    const { sort } = req.query
    console.log(sort, "it is minus okay ")
    try {
        const products = await ProductDetails.find({}).sort({ Saleprice: Number(sort) })
        console.log(products)
        if (products.length >= 0) {
            res.json({
                products: products,
                success: true,
                text: 'The fetched Products'
            })
        } else {
            res.json({
                success: false,
                text: 'No product is there to give you '
            })
        }
    } catch (error) {
        console.log(error)
    }
}

async function EdittheProducts(req, res) {
    let {
        _id,
        Category,
        Productname,
        Brand,
        Gender,
        ProductDescription,
        ImagesUrl,
        Saleprice,
        Discountprice,
        Size,
        Stocks
    } = req.body
    console.log(req.body.ProductImageUrl)
    try {
        const EditingProducts = await ProductDetails.findByIdAndUpdate({ _id })
        console.log("The Product to be edited ")

        console.log(EditingProducts)
        console.log(' ')

        EditingProducts.Productname = Productname
        EditingProducts.ProductDescription = ProductDescription;
        EditingProducts.Gender = Gender;
        EditingProducts.ImagesUrl = ImagesUrl;
        EditingProducts.Saleprice = Saleprice;
        EditingProducts.Discountprice = Discountprice;
        EditingProducts.Category = Category;
        EditingProducts.Brand = Brand;
        EditingProducts.Size = Size;
        EditingProducts.Stocks = Stocks;
        console.log("It is a edited Products ")
        console.log(EditingProducts)
        await EditingProducts.save()
        res.json({
            success: true,
            message: 'The Product is Successfully Updated'
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: 'There is Some Wrong in the Updation of the Product'
        })
    }
}

async function DeleteProduct(req, res) {
    let { _id } = req.body;
    try {
        // Attempt to delete the product
        const result = await ProductDetails.deleteOne({ _id });

        // Check if a product was deleted
        if (result.deletedCount > 0) {
            res.json({
                success: true,
                text: 'Product deleted successfully'
            });
        } else {
            res.json({
                success: false,
                text: 'No product found with the provided ID'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            text: 'An error occurred while trying to delete the product'
        });
    }
}



module.exports = {
    CreateProducts,
    FetchAllProducts,
    EdittheProducts
}