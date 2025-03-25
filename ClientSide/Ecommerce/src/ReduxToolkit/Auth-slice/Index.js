import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const LoginUsers = createAsyncThunk('LoginUsers', async (formdata) => {
    try {
        var response = await fetch("http://localhost:8001/auth/Login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Ensure you're sending JSON
            },
            credentials: 'include',
            body: JSON.stringify(formdata)
        })
        const data = await response.json()
        return data
    } catch (error) { }
})

const RegisterOfUser = createAsyncThunk('RegisterOfUser', async (formdata) => {
    try {
        var response = await fetch("http://localhost:8001/auth/Register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Ensure you're sending JSON
            },
            credentials: 'include',
            body: JSON.stringify(formdata)
        })
        const data = await response.json()
        return data
    } catch (error) {
        (error)
    }
})
const Authmiddleware = createAsyncThunk('Authmiddleware', async (formdata) => {
    try {
        var response = await fetch("http://localhost:8001/auth/Authmiddle", {
            method: "GET",
            credentials: 'include',
        })
        const data = await response.json()
        return data
    } catch (error) {

    }
})
const LoginState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}
const authslice = createSlice({
    name: "Authorization",
    initialState: LoginState,
    extraReducers: builders => {
        builders.addCase(LoginUsers.pending, (state, action) => {
            state.isAuthenticated = false
            state.isLoading = true
            state.user = null

        }).addCase(LoginUsers.fulfilled, (state, action) => {
            if (action.payload) {
                (action.payload);
                localStorage.setItem('isAuthenticated', action.payload.success)
                state.user = action.payload.user
            }
        }).addCase(LoginUsers.rejected, (state, action) => {
            localStorage.setItem('isAuthenticated', false)
            state.isLoading = true
            state.user = null
        }).addCase(RegisterOfUser.pending, (state, action) => {
            state.isAuthenticated = false
            state.isLoading = true
            state.user = null
        }).addCase(RegisterOfUser.rejected, (state, action) => {
            state.isAuthenticated = false
            state.isLoading = true
            state.user = null
        }).addCase(Authmiddleware.pending, (state, action) => {
            state.isLoading = true
            state.user = null
        }).addCase(Authmiddleware.fulfilled, (state, action) => {
            if (action.payload) {
                localStorage.setItem("Userid", action.payload.user.UserId)
                state.isAuthenticated = action.payload.success
                state.isLoading = false
                state.user = action.payload.user

            }



        }).addCase(Authmiddleware.rejected, (state, action) => {
            localStorage.setItem('isAuthenticated', action.payload.success)
            state.isLoading = true
            state.user = null
        })
    }

})





export { LoginUsers, RegisterOfUser, Authmiddleware }
export default authslice.reducer