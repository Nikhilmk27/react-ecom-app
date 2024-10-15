import {
  loginFailure,
  loginStart,
  loginSucess,
  signupStart,
  signupSuccessAction,
  signupFailure,
} from "./userRedux";
import { publicRequest,userRequest } from "../requestMethods";
import Cookies from "js-cookie";
import { setCart, clearCart } from "./cartRedux";

// for user login
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    console.log('Login Request:', user);
    const res = await publicRequest.post("/auth/login", user);
    console.log('Login Response Data:', res.data);
    Cookies.set("token", res.data.accessToken, { expires: 3 });
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch(loginSucess(res.data));
    // Fetch the user's cart data
    const cartRes = await userRequest.get(`/carts/find/${res.data._id}`);
    console.log('Cart Fetch Request for User ID:', res.data._id);
    console.log('Cart Fetch Response Data:', cartRes.data);

    if (cartRes.data && cartRes.data.products && cartRes.data.products.length > 0) {
      dispatch(
        setCart({
          userId: cartRes.data._id,
          products: cartRes.data.products,
          quantity: cartRes.data.products.length,
          total: cartRes.data.total,
        })
      );
    } else {
      dispatch(clearCart());
    }
  } catch (error) {
    console.log('Login Failure:', error.response?.data || error.message);
    dispatch(loginFailure());
  }
};

// for user signup
export const signup = async (dispatch, user) => {
  dispatch(signupStart());
  try {
    console.log('Signup Request:', user);
    const res = await publicRequest.post("/auth/register", user);
    console.log('Signup Response Data:', res.data);
    Cookies.set("token", res.data.accessToken, { expires: 3 });
    dispatch(signupSuccessAction(res.data));
    const cartRes = await userRequest.get(`/carts/find/${res.data._id}`);
    console.log('Cart Fetch Request for User ID:', res.data._id);
    console.log('Cart Fetch Response Data:', cartRes.data);
    dispatch(setCart(cartRes.data));
  } catch (error) {
    console.log('Signup Failure:', error.response?.data || error.message);
    dispatch(signupFailure());
  }
};

// to add product to the cart
export const addToCart = async (dispatch, product, userId) => {
  try {
    console.log('Add to Cart Request for User ID:', userId, 'Product:', product);
    const token = Cookies.get('token');
    console.log('Current token:', token);
    const res = await userRequest.post(`/carts/add/${userId}`, product);
    console.log('Add to Cart Response Data:', res.data);
    dispatch(
      setCart({
        userId: res.data.userId,
        products: res.data.products,
        quantity: res.data.products.length,
        total: res.data.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      })
    );
  } catch (error) {
    console.error('Error Adding to Cart:', error.response?.data || error.message);
    dispatch(loginFailure());
  }
};

// delete item from the user cart
export const deleteProduct = async (dispatch, userId, productId) => {
  try {
    console.log('Delete Product Request for User ID:', userId, 'Product ID:', productId);
    const res = await userRequest.delete(`/carts/remove/${userId}/${productId}`);
    console.log('Delete Product Response Data:', res.data);
    dispatch(
      setCart({
        userId: res.data.userId,
        products: res.data.products,
        quantity: res.data.products.length,
        total: res.data.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      })
    );
  } catch (error) {
    console.log('Error Deleting Product:', error.response?.data || error.message);
  }
};

// clear the user cart
export const clearUserCart = async (dispatch, userId) => {
  try {
    console.log('Clear Cart Request for User ID:', userId);
    const res = await userRequest.delete(`/carts/clear/${userId}`);
    console.log('Clear Cart Response Data:', res.data);
    // Update the cart state to be empty
    dispatch(
      setCart({
        userId: userId,
        products: [],
        quantity: 0,
        total: 0,
      })
    );
  } catch (error) {
    console.log('Error Clearing Cart:', error.response?.data || error.message);
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const res = await publicRequest.post("/auth/verify-otp", { email, otp });
    return { success: true, message: res.data.message };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "OTP verification failed. Please try again.",
    };
  }
};

export const resendOTP = async (email) => {
  try {
    const res = await publicRequest.post("/auth/resend-otp", { email });
    return { success: true, message: res.data.message };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to resend OTP. Please try again.",
    };
  }
};


// REFERENCE CODE
// import {
//   loginFailure,
//   loginStart,
//   loginSucess,
//   signupStart,
//   signupSuccess,
//   signupFailure,
// } from "./userRedux";
// import { publicRequest } from "../requestMethods";
// import Cookies from "js-cookie";
// import { setCart, clearCart } from "./cartRedux";

// // for user login
// export const login = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     const res = await publicRequest.post("/auth/login", user);
//     console.log(res.data);
//     Cookies.set("token", res.data.accessToken, { expires: 3 });
//     dispatch(loginSucess(res.data));
//     // Fetch the user's cart data
//     const cartRes = await publicRequest.get(`/carts/find/${res.data._id}`);

//     if (
//       cartRes.cart &&
//       cartRes.cart.products &&
//       cartRes.cart.products.length > 0
//     ) {
//       dispatch(
//         setCart({
//           userId: cartRes.data._id,
//           products: cartRes.cart.products,
//           quantity: cartRes.cart.quantity,
//           total: cartRes.cart.total,
//         })
//       );
//     } else {
//       dispatch(clearCart());
//     }
//   } catch (error) {
//     console.log("login failure");
//     dispatch(loginFailure());
//   }
// };

// // for user signup
// export const signup = async (dispatch, user) => {
//   dispatch(signupStart());
//   try {
//     const res = await publicRequest.post("/auth/register", user);
//     Cookies.set("token", res.data.accessToken, { expires: 3 });
//     dispatch(signupSuccess(res.data));
//     const cartRes = await publicRequest.get(`/carts/${res.data._id}`);
//     const cartData = cartRes.data;
//     dispatch(setCart(cartData));
//   } catch (error) {
//     dispatch(signupFailure());
//   }
// };

// // to add product to the cart

// export const addToCart = async (dispatch, product, userId) => {
//   try {
//     // Fetch the user's cart data
//     const res = await publicRequest.post(`/carts/add/${userId}`, product);
//     console.log(res.data);
//     dispatch(
//       setCart({
//         userId: res.data.userId,
//         products: res.data.products,
//         quantity: res.data.products.length,
//         total: res.data.products.reduce(
//           (acc, item) => acc + item.price * item.quantity,
//           0
//         ),
//       })
//     );
//   } catch (error) {
//     console.error(
//       "Error adding to cart:",
//       error.response?.data || error.message
//     );
//     dispatch(loginFailure());
//   }
// };

// // delete item from the user cart
// export const deleteProduct = async (dispatch, userId, productId) => {
//   try {
//     // delete product from cart
//     const res = await publicRequest.delete(
//       `/carts/remove/${userId}/${productId}`
//     );
//     console.log(res.data);
//     dispatch(
//       setCart({
//         userId: res.data.userId,
//         products: res.data.products,
//         quantity: res.data.products.length,
//         total: res.data.products.reduce(
//           (acc, item) => acc + item.price * item.quantity,
//           0
//         ),
//       })
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// // clear  the user cart
// export const clearUserCart = async (dispatch, userId) => {
//   try {
//     // delete product from cart
//     const res = await publicRequest.delete(`/carts/clear/${userId}`);
//     console.log(res.data);
//     // Update the cart state to be empty
//     dispatch(
//       setCart({
//         userId: userId,
//         products: [],
//         quantity: 0,
//         total: 0,
//       })
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };