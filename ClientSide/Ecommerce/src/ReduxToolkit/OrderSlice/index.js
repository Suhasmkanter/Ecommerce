import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    approvalUrl: null,
    orders: [],
    orderdetails: null,
    isloading: false,
    order: null
}
export const createNewOrder = createAsyncThunk("/createNewOrder", async (orderdetails) => {
    console.log(orderdetails)
    try {
        const response = await fetch('http://localhost:8001/order/create', {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(orderdetails)
        })
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error.message)
        return error.message

    }
})
export const captureNewOrder = createAsyncThunk("/captureNewOrder", async (paymentdetails) => {
    console.log(paymentdetails, "paymentdetails")
    try {
        const response = await fetch('http://localhost:8001/order/capture', {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(paymentdetails)
        })
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error.message)
        return error.message

    }
})
export const getAllOrders = createAsyncThunk("/getAllorders", async (userId) => {
    console.log(userId)
    try {
        const response = await fetch(`http://localhost:8001/order/list/${userId}`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error.message)
        return error.message

    }
})
export const getIndividualOrder = createAsyncThunk("/getIndicidualOrder", async (id) => {
    try {
        const response = await fetch(`http://localhost:8001/order/detail/${id}`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error.message)
        return error.message

    }
})
const shoppingOrder = createSlice({
    name: 'ShoppingOrders',
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(createNewOrder.pending, (state, action) => {
            state.isloading = true
        }).addCase(createNewOrder.fulfilled, (state, action) => {
            state.isloading = false
            state.approvalUrl = action.payload.approvalURL
            state.order = action.payload.orderId
            if (action.payload.success) {
                sessionStorage.setItem('currentId', action.payload.orderId)

            }
        }).addCase(createNewOrder.rejected, (state, action) => {
            state.isloading = true

        }).addCase(getAllOrders.fulfilled, (state, action) => {
            console.log(action.payload)
            state.orders = action.payload.data
        }).addCase(getIndividualOrder.fulfilled, (state, action) => {
            console.log(action.payload)
            state.orderdetails = action.payload.data
        })

    }
})


export default shoppingOrder.reducer