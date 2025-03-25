const ProductDetails = require('../Models/ProductDetails')

async function Shopproducts(req, res) {
    let { category = [], brand = [], sort = 'title-atoz' } = req.query;
    let filter = {};

    if (category.length > 0 && !category.includes('null')) {
        let categoryvalues = category.split(',');

        filter.Category = { $in: categoryvalues };
    }

    if (brand.length > 0 && !brand.includes('null')) {
        let brandvalues = brand.split(',');
        filter.Brand = { $in: brandvalues };
    }

    let sortsvalue = {};
    switch (sort) {
        case 'title-atoz':
            sortsvalue.title = 1;
            break;
        case 'title-ztoa':
            sortsvalue.title = -1;
            break;
        case 'price-lowtohigh':
            sortsvalue.price = 1;
            break;
        case 'price-hightolow':
            sortsvalue.price = -1;
            break;
        default:
            sortsvalue.title = 1;
            break;
    }

    try {
        let data = await ProductDetails.find(filter).sort(sortsvalue);
        res.json(data); // Send the data back to the client
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function getProductById(req, res) {
    let productid = req.params.id

    try {
        let data = await ProductDetails.find({ _id: productid })
        if (data) {
            res.json({
                productData: data,
                success: true
            })
        }
    } catch (error) {
        res.json({
            productData: error,
            success: false
        })
    }
}

module.exports = {
    Shopproducts,
    getProductById
}