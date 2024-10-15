
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    products: [],
    pending: false,
    error: false,
    wishlistQuantity:""
  },
  reducers: {
    addToWishlistStart: (state) => {
      state.pending = true;
    },
    addToWishlistSuccess: (state, action) => {
      state.pending = false;
      state.products.push(action.payload);
      state.wishlistQuantity = state.products.length;
    },
    addToWishlistFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    removeFromWishlistStart: (state) => {
      state.pending = true;
    },
    removeFromWishlistSuccess: (state, action) => {
      state.pending = false;
      state.products = state.products.filter(product => product._id !== action.payload);
      state.wishlistQuantity = state.products.length;
    },
    removeFromWishlistFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    getWishlistStart: (state) => {
      state.pending = true;
    },
    getWishlistSuccess: (state, action) => {
      state.pending = false;
      state.products = action.payload;
      state.wishlistQuantity = state.products.length;
    },
    getWishlistFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const { 
  addToWishlistStart, 
  addToWishlistSuccess, 
  addToWishlistFailure,
  removeFromWishlistStart,
  removeFromWishlistSuccess,
  removeFromWishlistFailure,
  getWishlistStart,
  getWishlistSuccess,
  getWishlistFailure,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;