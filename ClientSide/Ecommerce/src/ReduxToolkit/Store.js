import { configureStore } from '@reduxjs/toolkit';
import authreducer from './Auth-slice/Index'
import ShoppingProducts from './Shoppingproduct/index'
import Cart from './CartItems/index'
import productsSlice from './ProductCrud/Index'
import addressSlice from './Address/index'
import shoppingOrder from './OrderSlice/index'
import shoppingOrderforAdmin from "./OrderSlice/AdminOrder"
import searchitems from './SearchItems/index'
import Reviews from './Reviews/index'

const Store = configureStore({
    reducer: {
        Auth: authreducer,
        products: productsSlice,
        ShoppingProducts: ShoppingProducts,
        cartFunction: Cart,
        addressFunction: addressSlice,
        shoppingOrders: shoppingOrder,
        adminOrder: shoppingOrderforAdmin,
        searchItems: searchitems,
        userReviews: Reviews
    }
})

export default Store;