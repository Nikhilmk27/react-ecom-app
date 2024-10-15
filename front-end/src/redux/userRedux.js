import { createSlice } from "@reduxjs/toolkit";
import { clearCart } from "./cartRedux";
import Cookies from "js-cookie";

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
            localStorage.removeItem("user");
  Cookies.remove("token");

        },
        signupStart: (state) => {
            state.isFetching = true;
            state.signupSuccess = false;
            state.signupError = false;
        },
        signupSuccessAction: (state) => {
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
    

})

export const {loginStart,
    loginFailure,
    loginSucess,
    logout,
    signupStart,
    signupSuccessAction,
    signupFailure,
    signupSuccessReset} = userSlice.actions;
export default userSlice.reducer

// Thunk for checking user authentication
export const checkAuth = () => (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = Cookies.get("token");
    if (user && token) {
        dispatch(loginSucess(user));
    }
};
// extraReducers: (builder) => {
//     builder.addCase(clearCart, (state) => {
//         state.currentUser = null;
//     });
// }