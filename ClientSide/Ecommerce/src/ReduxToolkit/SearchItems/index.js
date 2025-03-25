import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Search } from "lucide-react";



export const Fetchitems = createAsyncThunk("/api/Searchitems", async (keyword) => {
    try {
        let response = await fetch(`http://localhost:8001/search/fetch/${keyword}`)
        let data = await response.json()
        return data
        console.log(data);
    } catch (error) {
        console.log(error.message)
    }

})
const initialState = {
    items: [],
    isloading: false,

}
const Searchitems = createSlice({
    name: "Searchitems",
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(Fetchitems.pending, (state, action) => {
            state.isloading = true
        }).addCase(Fetchitems.fulfilled, (state, action) => {
            console.log(action.payload)
            state.items = action.payload.items
            state.isloading = false
        }).addCase(Fetchitems.rejected, (state, action) => {
            state.isloading = true
        })
    }
})



export default Searchitems.reducer