import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const Addreviews = createAsyncThunk("/addreview", async ({
    comment,
    productId,
    userId,
    reviewScore
}) => {
    try {
        let response = await fetch('http://localhost:8001/review/' + userId + '/' + productId, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reviewScore, comment })
        })
        let data = await response.json()
        return data
    } catch (error) {
        console.log(error.message)
    }
})
export const fetchallReviews = createAsyncThunk("/fetchallreview", async ({

    productId,

}) => {
    console.log("Onclicks", productId)
    try {
        let response = await fetch('http://localhost:8001/review/fetchall', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ productId })
        })
        let data = await response.json()
        console.log(data, "The users data is used here for the reveiw")
        return data
    } catch (error) {
        console.log(error.message)
    }
})

const initialState = {
    userReviews: [],
    isloading: false,
    success: false
}
const Reviews = createSlice({
    name: 'UserReviews',
    initialState,
    reducers: {},
    extraReducers: (builders) => {
        builders.addCase(Addreviews.pending, (state, action) => {
            state.isloading = true
        }).addCase(Addreviews.fulfilled, (state, action) => {
            state.isloading = false
        }).addCase(Addreviews.rejected, (state, action) => {
            state.iserror = action.p
        }).addCase(fetchallReviews.pending, (state, action) => {
            state.isloading = true
        }).addCase(fetchallReviews.fulfilled, (state, action) => {
            state.isloading = false
            state.userReviews = action.payload.reviewsData
        }).addCase(fetchallReviews.rejected, (state, action) => {
            state.isloading = true
        })
    }
})


export default Reviews.reducer