import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const addToCart = createAsyncThunk('/cart/add', async ({ Userid, ProductId, quantity }) => {
    try {
        const response = await fetch('http://localhost:8001/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ Userid, ProductId, quantity })
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }

})

export const FetchCart = createAsyncThunk('/cart/fetch', async (Userid) => {
    console.log(` it is userid ${Userid}`);

    try {
        const response = await fetch(`http://localhost:8001/cart/get/${Userid}`)
        const data = await response.json()
        console.log(data);
        return data
    } catch (error) {
        console.log(error)
    }

})

export const DeletetoCart = createAsyncThunk('/cart/delete', async ({ Userid, ProductId }) => {
    try {
        const response = await fetch(`http://localhost:8001/cart/${Userid}/${ProductId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': "Application/json"
            },
            body: JSON.stringify({ Userid, ProductId })
        })
    } catch (error) {
        console.log(error)
    }

})

export const updateToCart = createAsyncThunk('/cart/update', async ({ Userid, ProductId, quantity }) => {
    try {
        console.log(Userid, ProductId, quantity)
        const response = await fetch(`http://localhost:8001/cart/update-cart`, {
            method: 'PUT',
            headers: {
                'Content-type': "Application/json"
            },
            body: JSON.stringify({ Userid, ProductId, quantity })
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }

})

const initialState = {
    success: false,
    cartItems: [],
    isLoading: true
}
export const Cart = createSlice({
    name: 'CartFunctions',
    initialState,
    extraReducers: (builders) => {
        builders.addCase(addToCart.pending, (state, action) => {
            state.success = false
            state.cartItems = []
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload, "hi bro")
        }).addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        })
            .addCase(FetchCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(FetchCart.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoading = false;
                state.success = true
                state.cartItems = action.payload.data.items;
                state.cartId = action.payload.data._id

            })
            .addCase(FetchCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(updateToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log("hello")
            })
            .addCase(updateToCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(DeletetoCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(DeletetoCart.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload.data)
                if (action.payload) {
                    state.cartItems = action.payload.data.items;

                }
            })
            .addCase(DeletetoCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            });
    }
})


export default Cart.reducer