import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const addAddress = createAsyncThunk('/address/addAddress', async ({
    pincode,
    city,
    phone,
    notes,
    address,
    userId
}) => {
    try {
        let data = await fetch('http://localhost:8001/address/Create', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                pincode,
                city,
                phone,
                notes,
                address,
                userId,
            })
        })
        return await data.json()
    } catch (error) {
        console.log(error)
    }
})

export const fetchAddress = createAsyncThunk('/address/fetchAddress', async () => {
    try {
        let data = await fetch('http://localhost:8001/address/fetch')
        return await data.json()
    } catch (error) {
        console.log(error)
    }
})

export const editAddress = createAsyncThunk('/address/editAddress', async ({ userId, addressId }) => {
    try {
        let data = await fetch('http://localhost:8001/address/edit/' + userId + `/${addressId}`)
        return await data.json()
    } catch (error) {
        console.log(error)
    }
})
export const deleteAddrerss = createAsyncThunk('/address/deleteaddress', async ({ userId, addressId }) => {
    try {
        let data = await fetch('http://localhost:8001/address/delete/' + userId + `/${addressId}`, {
            method: "DELETE"
        })
        return await data.json()
    } catch (error) {
        console.log(error)
    }
})



const initialState = {
    addressarray: [],
    message: false,
    userMessage: ' ',
    editMessage: ' ',
    deleteMessage: ''
}


const addressSlice = createSlice({
    name: 'Address',
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(addAddress.fulfilled, (state, action) => {
            if (action.payload) {
                state.userMessage = action.payload.message
            }
        }).addCase(fetchAddress.fulfilled, (state, action) => {
            if (action.payload) {
                state.addressarray = action.payload.data
                state.message = action.payload.success
            }
        }).addCase(editAddress.fulfilled, (state, action) => {
            if (action.payload) {
                state.editMessage = action.payload.message
            }
        }).addCase(deleteAddrerss.fulfilled, (state, action) => {
            if (action.payload) {
                state.deleteMessage = action.payload.message
            }
        })
    }
})


export default addressSlice.reducer