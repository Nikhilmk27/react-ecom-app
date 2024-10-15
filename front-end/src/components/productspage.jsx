import styled from "styled-components"
import Product from "./Product"
import { useEffect, useState } from "react";
import axios from "axios";
const Container = styled.div`
padding: 10px;
display: flex;
flex-wrap:wrap;
justify-content: space-between;
`
const Productspage = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(

             "http://localhost:5000/api/products"
        );
        console.log(res)
        setProducts(res.data);
      } catch (err) {
        console.log(err.message)
      }
    };
    getProducts();
  },[]);

  

  return (
    <Container>
      { products.map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
}

export default Productspage