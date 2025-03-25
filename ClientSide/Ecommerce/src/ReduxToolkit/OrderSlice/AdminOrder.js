import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {


    orders: [],
    orderdetails: null,
    isloading: false,
    order: null
}

export const getAllOrdersAdmin = createAsyncThunk("/getAllordersAdmin", async () => {
    try {
        const response = await fetch(`http://localhost:8001/adminorder/list`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error.message)
        return error.message

    }
})
export const getIndividualOrderAdmin = createAsyncThunk("/getIndividualOrderAdmin", async (id) => {
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
export const UpdatetheAdminUser = createAsyncThunk("/UpdatetheAdminUser", async ({ id, status }) => {
    console.log(id, status)
    try {
        const response = await fetch(`http://localhost:8001/adminorder/update/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        })
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error.message)
        return error.message

    }
})
const shoppingOrderforAdmin = createSlice({
    name: 'ShoppingOrdersforAdmin',
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
            console.log(action.payload)
            state.orders = action.payload.data
        }).addCase(getIndividualOrderAdmin.fulfilled, (state, action) => {
            console.log(action.payload)
            state.orderdetails = action.payload.data
        }).addCase(UpdatetheAdminUser.pending, (state, action) => {
            state.isloading = true
        }).addCase(UpdatetheAdminUser.fulfilled, (state, action) => {
            console.log(action.payload.success)
        })

    }
})


export default shoppingOrderforAdmin.reducer