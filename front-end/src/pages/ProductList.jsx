import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
const Container = styled.div``
const Title = styled.h1`
font-size:20px;
margin:20px;
text-align:center;

`
const FilterContainer = styled.div`
display: flex;
justify-content:space-between;
margin: 20px;

`
const Filter = styled.div``
const FilterText = styled.span`
    font-size:15px;
    font-weight:600;
    margin-right:20px;
`
const Select = styled.select`
padding:10px;
margin-right:10px;
`
const Option = styled.option``


const ProductList = () => {
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>Embracing Traditional Feminine Elegance</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products</FilterText>
                <Select>
                <Option disabled selected>color</Option>
                     <Option>white</Option>
                     <Option>black</Option>
                     <Option>red</Option>
                     <Option>blue</Option>
                     <Option>green</Option>
                     <Option>orange</Option>
                </Select>
                <Select>
                <Option disabled selected>size</Option>
                     <Option>XS</Option>
                     <Option>S</Option>
                     <Option>M</Option>
                     <Option>L</Option>
                     <Option>XL</Option>
                     <Option>XXL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products</FilterText>
                <Select>
                <Option disabled selected>Latest</Option>
                     <Option>price low to high</Option>
                     <Option>price high to low</Option>
                     
                </Select>
                
            </Filter>
        </FilterContainer>
        <Products/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList