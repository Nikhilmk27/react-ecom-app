import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkcopy from "./pages/Checkcopy"
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/notfound";
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import  { useEffect } from 'react';
import { recalculateTotal } from './redux/cartRedux';
import { checkAuth } from "./redux/userRedux";

import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";
import Products from "./components/Products";
import Categories from "./components/Categories";
import AllProducts from "./pages/AllProducts";
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden; /* Prevent horizontal scrolling */
  }
`;


function App() {
  const user = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(recalculateTotal());
  }, [dispatch]);
  return (
    <BrowserRouter>
    <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user?<Navigate to ="/"/>:<Login /> } />
        <Route path="/register" element={user?<Navigate to ="/"/>:<Register /> } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkcopy />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/Products/:category"element={<ProductList />} />
        <Route path="/wishlist" element={<Wishlist />} />
         <Route path="/allproducts" element={<AllProducts />} />
        <Route path="*" element={<NotFound />} />
        {/* admin routs */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
