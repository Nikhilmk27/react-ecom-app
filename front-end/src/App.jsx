import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import NotFound from "./pages/notfound";
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom';

function App() {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user?<Navigate to ="/"/>:<Login /> } />
        <Route path="/register" element={user?<Navigate to ="/"/>:<Register /> } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/Products/:category"element={<ProductList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
