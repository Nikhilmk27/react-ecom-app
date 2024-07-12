import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../redux/userRedux";
import { clearCart } from "../redux/cartRedux";

const Container = styled.div`
  height: 50px;
  ${mobile`
    height: 50px;
    margin-left: 2px; 
  `}
`;
const Wrapper = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile`
    padding: 10px;
    margin-left: 2px; 
  `}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile`
    align-items: flex-start;
  `}
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile`
    display: none;
  `}
`;
const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile`
    margin-left: 2px; 
  `}
`;
const Input = styled.input`
  border: none;
  ${mobile`
    width: 50px;
  `}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  font-size: 16px;
  ${mobile`
    font-size: 12px;
  `}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile`
    flex: 2;
    justify-content: center;
  `}
`;
const MenuItems = styled.div`
  font-size: 12px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile`
    font-size: 8px;
    margin-left: 2px;
  `}
`;
const StyledLink = styled(Link)`
  text-decoration: none; 
  color: inherit;
`;

const PlainButton = styled.button`
  all: unset;
  cursor: pointer; /* optional: to keep pointer cursor on hover */
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  console.log(quantity);
  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("token"); // Remove the JWT token from cookies
    dispatch(logout()); // Update the Redux state
    navigate("/");
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <SearchIcon style={{ color: "gray", fontSize: "15px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>FASHION</Logo>
        </Center>
        <Right>
          <StyledLink to="/register">
            <MenuItems>Register</MenuItems>
          </StyledLink>
          <StyledLink to="/login">
            <MenuItems>Sign In</MenuItems>
          </StyledLink>
          <MenuItems>
            <PlainButton onClick={handleLogout}>Logout</PlainButton>
          </MenuItems>
          {currentUser ? (<Link to="/cart">
            <MenuItems>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItems>
          </Link>):(
            <MenuItems>
            
              <ShoppingCartOutlinedIcon />
            
          </MenuItems>

          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
