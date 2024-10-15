import styled from 'styled-components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {sliderItems,categories} from '../data'
import { useState } from 'react';
import { mobile } from '../responsive';
import { Link,useNavigate } from 'react-router-dom';
const Container = styled.div`
width: 100%;
height: 110vh;
display: flex;
/* background-color:aqua;  */
position  :relative ;
overflow: hidden;
${mobile`
    display:none;
  `}
`;
const Arrow = styled.div`
width: 50px;
height: 50px;
background-color:#e7e0db;
color: #e96e1c;
border-radius:50%;
display: flex;
align-items:center;
justify-content:center;
position: absolute;
top: 0;
bottom: 0;
left: ${props => props.direction === 'left' ? '10px' : ''}; 
right: ${props => props.direction === 'left' ? '' : '10px'}; 
margin:auto;
cursor: pointer; 
opacity:.5;
z-index:2;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition:all 1.5s ease;
  transform:translateX(${(props)=> props.slideIndex*-100}vw)
`;
const Slide = styled.div`
width: 100vw;
height: 100vh;
  display: flex;
  align-items:center;
  color: white;
  background-color:${props=>props.bg}
`;
const ImageContainer = styled.div`
  /* flex: 1;
  height: 100%; */
  flex: 1;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  /* height: 80%;
  width: 100%; */
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`
const InfoContainer = styled.div`
  flex:1;
  padding: 30px;
`;
const Title = styled.h1`
font-size:40px;
`
const Description = styled.p`
margin: 50px 0px;
font-size: 20px;
font-weight:500;
letter-spacing: 3px;
`
const Button = styled.button`
padding: 5px;
font-size: 15px;
background-color:#009926;
cursor: pointer;

`
const Slider = () => {

  const [slideIndex,setSlideIndex] = useState(0)
  const handleClick = direction => {
  if (direction === 'left') {
    setSlideIndex(slideIndex === 0 ? sliderItems.length - 1 : slideIndex - 1);
  } else {
    setSlideIndex(slideIndex === sliderItems.length - 1 ? 0 : slideIndex + 1);
  }
};
  return (
    <Container>
        <Arrow direction="left" onClick={()=> handleClick("left")}>
          <ArrowBackIosIcon/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item)=>(
          <Slide bg={item.bg} key = {item.id}>
          <ImageContainer>
          <Image src={item.img} alt="Description"/>


          </ImageContainer>
          <InfoContainer>
            <Title>{item.title}</Title>
            <Description>{item.desc}  </Description>
            <Link to={`/allproducts`}><Button>shop now</Button></Link>
            
           

          </InfoContainer>
          </Slide>

        ))}
          
          

        </Wrapper>
        <Arrow direction = "right" onClick={()=> handleClick("right")}>
          <ArrowForwardIosIcon/>
        </Arrow>
    </Container>
  )
}

export default Slider

