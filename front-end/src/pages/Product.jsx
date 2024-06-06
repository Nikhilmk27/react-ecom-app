import styled from "styled-components"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import Announcement from "../components/Announcement"
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button } from "@mui/material"
import { mobile } from "../responsive"
const Container = styled.div`

`
const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile`
    padding:10px;
    flex-direction:column; 
  `}
`
const ImageContainer = styled.div`
flex: 1;
`
const Image = styled.img`
width: 100%;
height: 90vh;
object-fit: cover;
${mobile`
    height:70vh;
  `}

`
const InfoContainer = styled.div`
flex: 1;
padding: 0px 50px;
${mobile`
    padding: 10px; 
  `}
`
const Title = styled.h1`
font-weight:200;

`
const Desc = styled.p`
margin: 20px 0px;
`
const Price = styled.span`
font-weight:100;
font-size:20px;
`
const FilterContainer = styled.div`
width: 50%;
margin: 30px 0px;
display: flex;
justify-content: space-between;
${mobile`
    widht: 100%;
  `}
`
const Filter = styled.div`
display: flex;
align-items: center;
`
const FilterTitle = styled.span`
font-size: 20px;
font-weight:200;
margin-left:10px;

`
const FilterColor = styled.div`
width: 20px;
height: 20px;
border-radius:50%;
background-color: ${(props) => props.color};
margin: 0px 5px;
cursor: pointer;
`
const FilterSize = styled.select`
margin-left:10px;
padding: 5px;
`
const FilterSizeOption = styled.option``
const AddContainer = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: space-between;
${mobile`
    width:100%; 
  `}
`
const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight:700;
`
const Amount= styled.span`
width: 30px;
height: 30px;
border-radius:10px;
border: 2px solid gray;
display: flex;
align-items: center;
justify-content: center;
margin: 0px 5px;

`
const CartButton = styled.button`
padding: 15px;
border: 2px solid gray;
background-color:white;
cursor: pointer;
font-weight: 500;
&:hover{
    background-color: gray;
}
`

const Product = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImageContainer>
                <Image src="https://i.pinimg.com/736x/6f/35/a7/6f35a714578624a71641dce376272dd9.jpg"/>
            </ImageContainer>
            <InfoContainer>
                <Title>skirt and top</Title>
                <Desc>latest arrival the elegent black traditionam skirt and top</Desc>
                <Price>RS 5000</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>color</FilterTitle>
                        <FilterColor color ="black"/>
                        <FilterColor color ="darkblue"/> 
                        <FilterColor color ="gray"/>  

                    </Filter>
                    <Filter>
                    <FilterTitle>Size</FilterTitle>
                    <FilterSize>
                        <FilterSizeOption>XS</FilterSizeOption>
                        <FilterSizeOption>S</FilterSizeOption>
                        <FilterSizeOption>M</FilterSizeOption>
                        <FilterSizeOption>L</FilterSizeOption>
                        <FilterSizeOption>XL</FilterSizeOption>
                    </FilterSize>

                        
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <RemoveOutlinedIcon/>
                        <Amount>1</Amount>
                        <AddOutlinedIcon/>
                        

                    </AmountContainer>
                    <CartButton>add to cart</CartButton>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default Product