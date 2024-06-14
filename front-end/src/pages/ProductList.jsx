import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from '../responsive'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
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
const Filter = styled.div`
margin: 20px;
${mobile`
    margin:0px 10px ;
    display:flex;
    flex-direction:column;
  `}
`
const FilterText = styled.span`
    font-size:15px;
    font-weight:600;
    margin-right:20px;
    ${mobile`
    margin: 5px 0px; 
  `}
`
const Select = styled.select`
padding:10px;
margin-right:10px;
${mobile`
    margin: 5px 0px; 
  `}

`
const Option = styled.option``


const ProductList = () => {
  const location = useLocation()
  const cat = location.pathname.split('/')[2]
  const [filters,setFilters] = useState({})
  const [sort,setSort] = useState("Latest")
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name] : value,
    })
  }
  
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products</FilterText>
                <Select name='color' onChange={handleFilters} defaultValue="">
                <Option disabled value="">Color</Option>
            <Option value="white">white</Option>
            <Option value="black">black</Option>
            <Option value="red">red</Option>
            <Option value="blue">blue</Option>
            <Option value="green">green</Option>
            <Option value="orange">orange</Option>
                </Select>
                <Select name='size' onChange={handleFilters} defaultValue="" >
                <Option disabled value="">Size</Option>
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products</FilterText>
                <Select onChange={(e) => setSort(e.target.value)}>
                <Option value="Latest">Latest</Option>
                     <Option value="asc">price low to high</Option>
                     <Option value="desc">price high to low</Option>
                     
                </Select>
                
            </Filter>
        </FilterContainer>
        <Products cat ={cat} filters = {filters} sort = {sort} />
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList