import { 
    addToWishlistStart, 
    addToWishlistSuccess, 
    addToWishlistFailure,
    removeFromWishlistStart,
    removeFromWishlistSuccess,
    removeFromWishlistFailure,
    getWishlistStart,
    getWishlistSuccess,
    getWishlistFailure,
  } from "./wishlistRedux";
  import { userRequest } from "../requestMethods";
  
  export const addToWishlist = async (dispatch, productId) => {
    dispatch(addToWishlistStart());
    try {
      const res = await userRequest.post('/wishlist', { productId });
      dispatch(addToWishlistSuccess(res.data));
    } catch (err) {
      dispatch(addToWishlistFailure());
    }
  };
  
  export const removeFromWishlist = async (dispatch, productId) => {
    dispatch(removeFromWishlistStart());
    try {
      await userRequest.delete(`/wishlist/${productId}`);
      dispatch(removeFromWishlistSuccess(productId));
    } catch (err) {
      dispatch(removeFromWishlistFailure());
    }
  };
  
  export const getWishlist = async (dispatch) => {
    dispatch(getWishlistStart());
    try {
      const res = await userRequest.get('/wishlist');
      dispatch(getWishlistSuccess(res.data));
    } catch (err) {
      dispatch(getWishlistFailure());
    }
  };
  