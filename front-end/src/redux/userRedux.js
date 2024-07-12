import { createSlice } from "@reduxjs/toolkit";
import { clearCart } from "./cartRedux";
const userSlice = createSlice({
    name:"user",
    initialState : {
        currentUser : null,
        isFetching : false,
        error:false,
        signupSuccess:false,
        signupError:false,
    },
    reducers :{
        loginStart :(state) => {
            state.isFetching = true
        },
        loginSucess :(state,action) => {
            state.isFetching = false;
            state.currentUser = action.payload
        },
        loginFailure :(state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout : (state) =>{
            state.currentUser = null;

        },
        signupStart: (state) => {
            state.isFetching = true;
            state.signupSuccess = false;
            state.signupError = false;
        },
        signupSuccess: (state) => {
            state.isFetching = false;
            state.signupSuccess = true;
            state.signupError = false;
            // state.currentUser = action.payload;
        },
       
        signupFailure: (state) => {
            state.isFetching = false;
            state.signupSuccess = false;
            state.signupError = true;
        },
        signupSuccessReset: (state) => { 
            state.signupSuccess = false;
        },
        

    },
    extraReducers: (builder) => {
        builder.addCase(clearCart, (state) => {
            state.currentUser = null;
        });
    }

})

export const {loginStart,
    loginFailure,
    loginSucess,
    logout,
    signupStart,
    signupSuccess,
    signupFailure,
    signupSuccessReset} = userSlice.actions;
export default userSlice.reducer