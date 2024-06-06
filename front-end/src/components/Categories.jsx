import styled from "styled-components"
import {categories} from '../data'
import CategoryItem from "./CategoryItem"
import { mobile } from "../responsive"
const Container = styled.div`
  display: flex;
  padding: 20px;
  ${mobile`
    padding: 0px;
    flex-direction: column;
    margin: 0px;
  `}
`;
const Categories = () => {
  return (
    <Container>
        {categories.map(item =>(
            <CategoryItem item={item} key = {item.id}/>
        ))}
    </Container>
  )
}

export default Categories