import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search'; 
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Container = styled.div`
  height:60px;
`;
const Wrapper = styled.div`
padding:10px 20px;
display:flex;
align-items:center;
justify-content:space-between;

`;
const Left = styled.div`
flex:1;
display: flex;
align-items:center;

`;
const Language = styled.span`
font-size : 14px;
cursor : pointer;  
`;
const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items:center;
  margin-left:25px;
  padding:5px;
`;
const Input = styled.input`
border:none;
`
const Center = styled.div`
flex:1;
text-align:center;
`;
const Logo = styled.h1`
  font-weight:bold;
  font-size:16px;
`
const Right = styled.div`
flex:1 ;
display: flex;
align-items:center;
justify-content:flex-end; 
`;
const MenuItems = styled.div`
  font-size:14px;
  cursor:pointor;
  margin-left:25px;

`

const Navbar = () => {
  return (
    <Container>
        <Wrapper>
            <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input></Input>
              <SearchIcon style={{color:'gray',fontSize:"15px"}}></SearchIcon>
            </SearchContainer>
            </Left>
            <Center><Logo>FASHION SHOP</Logo></Center>
            <Right>
              <MenuItems>Register</MenuItems>
              <MenuItems>SignIn</MenuItems>
              <MenuItems>
              


    <Badge badgeContent={4} color="primary">
      <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
    </Badge>



              </MenuItems>
            </Right>
        </Wrapper>
      
    </Container>
  );
};

export default Navbar;


 