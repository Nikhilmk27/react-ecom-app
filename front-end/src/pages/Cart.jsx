import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProduct } from "../redux/apiCalls";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile`
    padding:10px;
  `}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#010d05" : "transparent"};
  color: ${(props) => props.type === "filled" && "orange"};
`;
const TopTexts = styled.div`
  ${mobile`
display:none;
    
    `}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile`
    flex-direction:column;
  `}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile`
    flex-direction:column;
  `}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 5px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span`
font-size:15px;
`;
const PriceDetail = styled.div`
  flex: 1;
  font-size:15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile`
    margin:5px 15px;
  `}
`;
const ProductPrice = styled.div`
  font-size: 25px;
  font-weight: 150;
  ${mobile`
    margin-bottom:20px;
  `}
`;
const Hr = styled.hr`
  background-color: #c7d2d2;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid gray;
  border-radius: 10px;
  padding: 10px;
  height: 60vh;
`;
const SummeryTitle = styled.h1`
  font-weight: 200;
  font-size: 15px;
`;
const SummeryItem = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "600"};
  font-size: ${(props) => props.type === "total" && "18px"};
`;
const SummeryItemText = styled.span``;
const SummeryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: orange;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
  font-size: 24px;
  display: flex;

  &:hover {
    color: #cc0000;
  }

  &:focus {
    outline: none;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
 console.log(cart)
  const userId = useSelector((state) => state.cart.userId);
  const dispatch = useDispatch();

  const handleDeleteProduct = (ProductId) => {
    console.log(ProductId, userId);
    deleteProduct(dispatch, userId, ProductId);
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>my cart</Title>
        <Top>
          <TopButton>CONTINUE SHOPING</TopButton>
          <TopTexts>
            <TopText>shopping cart(2)</TopText>
            <TopText>your wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECK OUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.image} />
                  <Details>
                    <ProductName>
                      <b>product:</b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>id:</b>
                      {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>size:</b>
                      {product.size}
                    </ProductSize>
                    <ProductPrice>
                    price:{product.price * product.quantity}
                  </ProductPrice>
                  <PriceDetail>
                  <ProductAmountContainer>
                    <RemoveOutlinedIcon />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <AddOutlinedIcon />
                  </ProductAmountContainer>
                  
                </PriceDetail>
                    
                    <RemoveButton
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <DeleteIcon />
                    </RemoveButton>
                  </Details>
                </ProductDetail>
                
              </Product>
            ))}
            <Hr></Hr>
          </Info>
          <Summary>
            <SummeryTitle>ORDER SUMERY</SummeryTitle>
            <SummeryItem>
              <SummeryItemText>sub total</SummeryItemText>
              <SummeryItemPrice>{cart.total}</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem>
              <SummeryItemText>shiping charge</SummeryItemText>
              <SummeryItemPrice>RS 50</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem>
              <SummeryItemText>shiping discount</SummeryItemText>
              <SummeryItemPrice>RS 50</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem type="total">
              <SummeryItemText>TOTAL</SummeryItemText>
              <SummeryItemPrice>{cart.total}</SummeryItemPrice>
            </SummeryItem>
            <StyledLink to="/checkout">
            <Button>
              CHECKOUT NOW
            </Button>
            </StyledLink>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
