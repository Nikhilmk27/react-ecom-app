import {loginFailure,loginStart,loginSucess,
    signupStart,signupSuccess,signupFailure} from "./userRedux"
import {publicRequest} from "../requestMethods"
import { userRequest } from "../requestMethods";
import Cookies from "js-cookie";
import { setCart } from "./cartRedux";

// for user login
export const login = async(dispatch,user)=> { 

    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login",user)
        console.log(res.data)
        Cookies.set('token', res.data.accessToken, { expires: 3 });
        dispatch(loginSucess(res.data))
        // Fetch the user's cart data
    const cartRes = await publicRequest.get(`/carts/find/${res.data._id}`);
    dispatch(setCart({
      userId: res.data._id,
      products: cartRes.data.products,
      quantity: cartRes.data.quantity,
      total: cartRes.data.total,
    }));
        
    } catch (error) {
      console.log("login failure")
       dispatch(loginFailure()) 
    }       
}

// for user signup
export const signup = async (dispatch, user) => {
    dispatch(signupStart());
    try {
      const res = await publicRequest.post("/auth/register", user);
      Cookies.set('token', res.data.accessToken, { expires: 3 });
      dispatch(signupSuccess(res.data));
      const cartRes = await publicRequest.get(`/carts/${res.data._id}`);
        const cartData = cartRes.data;
        dispatch(setCart(cartData));
    } catch (error) {
      dispatch(signupFailure());
    }
  };

  // to add product to the cart

  export const addToCart = async(dispatch,product,userId)=> { 
    try {
      // Fetch the user's cart data
        const res = await publicRequest.post(`/carts/add/${userId}`,product)
        console.log(res.data)
        dispatch(setCart({
           userId: res.data.userId,
          products: res.data.products,
          quantity: res.data.products.length,
          total: res.data.products.reduce((acc, item) => acc + item.price * item.quantity, 0),
      }));
   
        
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
       dispatch(loginFailure()) 
    }       
}

// delete item from the user cart
export const deleteProduct = async (dispatch,userId,productId) =>{
  try {
    // delete product from cart
  const res = await publicRequest.delete(`/carts/remove/${userId}/${productId}`)
  console.log(res.data)
  dispatch(setCart({
    userId: res.data.userId,
   products: res.data.products,
   quantity: res.data.products.length,
   total: res.data.products.reduce((acc, item) => acc + item.price * item.quantity, 0),
}));
    
  } catch (error) {
    console.log(error)
  }
  
}