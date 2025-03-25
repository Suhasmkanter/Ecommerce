import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    message: '',
    success: false,
    error: false,
};

// Create Product
export const CreateProductAsyncThunk = createAsyncThunk('products/create', async (formdata, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:8001/Admin/Newproduct', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        });
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Edit Product
export const EditProductsAsyncThunk = createAsyncThunk('products/edit', async (formdata, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:8001/Admin/edit-product', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        });
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Fetch All Products
export const FetchAllProducts = createAsyncThunk('products/fetchAll', async (sortvalue, { rejectWithValue }) => {
    console.log(sortvalue)
    try {
        const response = await fetch('http://localhost:8001/Admin/fetchproducts/?' + `sort=${sortvalue}`);
        return await response.json();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CreateProductAsyncThunk.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(EditProductsAsyncThunk.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(FetchAllProducts.fulfilled, (state, action) => {
                state.products = action.payload.products || [];
                state.message = action.payload.message;
                state.success = action.payload.success;
                state.error = false;
            })
            .addCase(FetchAllProducts.rejected, (state, action) => {
                state.error = true;
                state.message = action.payload;
                state.products = [];
                state.success = false;
            });
    },
});

export default productsSlice.reducer;