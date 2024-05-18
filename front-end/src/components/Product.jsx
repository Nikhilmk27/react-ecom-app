import styled from "styled-components"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Info = styled.div`
opacity: 0;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color:rgba(0,0,0,.2);
z-index: 3;
display:flex;
align-items: center;
justify-content: center;
transition: 0.5s all ease;
cursor: pointer;
`
const Container = styled.div`
flex:1;
margin: 5px;
min-width:230px;
height:350px;
display: flex;
align-items: center;
justify-content: center;
background-color: #f6f4f2;
position: relative;
&:hover ${Info}{
  opacity:1;
}
`
const Circle = styled.div`
width: 200px;
height: 200px;
border-radius:50%;
background-color: white;
position: absolute;
`
const Image = styled.img`
height: 75%;
z-index: 2;
`

const Icon = styled.div`
width:40px;
height:40px;
border-radius: 50px;
background-color:white;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition: all 0.5s ease;
&:hover{
  background-color:gray;
  transform:scale(1.1)

}
`

function product({item}) {
  return (
    <Container>
      <Circle></Circle>
      <Image src = {item.img}></Image>
      <Info>
        <Icon>
        <ShoppingCartOutlinedIcon/>
        </Icon>
        <Icon>
        <SearchOutlinedIcon/>
        </Icon>
        <Icon>
        <FavoriteBorderOutlinedIcon/>
        </Icon>
      </Info>

    </Container>
  )
}

export default product