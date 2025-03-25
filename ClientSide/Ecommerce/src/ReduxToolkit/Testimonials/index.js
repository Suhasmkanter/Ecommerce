import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    testimonialsList: [],
    isloading: false
}


export const fetchTestimonials = createAsyncThunk("/fetchtestimonials", async () => {
    try {
        const response = await fetch("http://localhost:8001/testimonials/fetchall")
        const data = await response.json()
        return data
    } catch (error) {

    }
})
const testimonials = createSlice({
    name: 'testimonials',
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(fetchTestimonials.pending, (state, action) => {
            state.isloading = true
        }).addCase(fetchTestimonials.fulfilled, (state, action) => {
            state.isloading = false
            state.testimonialsList = action.payload.data
        }).addCase(fetchTestimonials.rejected, (state, action) => {
            state.isloading = false
        })
    }
})




export default testimonials.reducer