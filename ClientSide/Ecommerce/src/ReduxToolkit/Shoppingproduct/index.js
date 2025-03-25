import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const ShoppingproductsAsyncThunk = createAsyncThunk('/shop/Allproducts', async ({ queryvalues, sort }) => {
    let values = queryvalues.get('Category')
    let brands = queryvalues.get("Brand")
    console.log(values, brands)

    try {
        let response = await fetch(`http://localhost:8001/shop/Allproducts?category=${values}&brand=${brands}&sort=${sort}`)
        return response.json()

    } catch (error) {
        console.log(error)
    }
})


export const fetchSingleProduct = createAsyncThunk('/shop/product', async (Userid) => {
    console.log(Userid)
    try {
        let response = await fetch(`http://localhost:8001/shop/products/${Userid}`)
        let data = response.json()
        return data
    } catch (error) {
        console.log(error)
    }
})
const initialState = {
    singleProduct: null,
    products: [],
    success: false
}
const ShoppingProducts = createSlice({
    name: 'Shopping',
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(ShoppingproductsAsyncThunk.pending, (state, action) => {
            state.products = []
            state.success = false
        }).addCase(ShoppingproductsAsyncThunk.fulfilled, (state, action) => {
            state.products = action.payload
            state.success = action.payload.success
        }).addCase(ShoppingproductsAsyncThunk.rejected, (state, action) => {
            state.products = []
            state.success = action.payload.success
        }).addCase(fetchSingleProduct.pending, (state, action) => {
            state.products = []
            state.success = false
        }).addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.singleProduct = action.payload.productData
            state.success = action.payload.success
        }).addCase(fetchSingleProduct.rejected, (state, action) => {
            state.products = []
            state.success = action.payload.success
        })
    }
})










export default ShoppingProducts.reducer