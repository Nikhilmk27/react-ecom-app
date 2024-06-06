import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search'; 
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../responsive';

const Container = styled.div`
  height: 60px;
  ${mobile`
    height: 50px;
    margin-left: 2px; 
  `}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
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
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile`
    font-size: 10px;
    margin-left: 2px;
  `} 
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input />
            <SearchIcon style={{ color: 'gray', fontSize: '15px' }} />
          </SearchContainer>
        </Left>
        <Center><Logo>FASHION</Logo></Center>
        <Right>
          <MenuItems>Register</MenuItems>
          <MenuItems>Sign In</MenuItems>
          <MenuItems>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </MenuItems>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
