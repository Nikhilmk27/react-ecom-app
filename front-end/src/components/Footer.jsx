import styled from "styled-components";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { mobile } from "../responsive";
const Container = styled.div`
display: flex;
${mobile`
   flex-direction:column;
  `}
`;
const Left = styled.div`
flex: 1;
display: flex;
flex-direction:column;
padding: 20px;

`;
const Logo = styled.h1`
font-size: 25px;
`
const Desc = styled.p`
margin: 20px 0px;
`
const SocialContainer = styled.div`
display:flex;

`
const SocialIcon = styled.div`
width : 40px;
height: 40px;
border-radius: 50%;
color: white;
background-color: ${props=> props.color};
display: flex;
align-items: center;
justify-content: center;
margin: 5px;

`
const Center = styled.div`
flex:1;
padding: 20px;
${mobile`
    display:none;
  `}

`;
const Title = styled.h3`
margin-bottom:30px;

`
const List = styled.ul`
margin:0;
padding:0;
list-style:none;
display: flex;
flex-wrap:wrap;
`
const ListItem = styled.li`
width: 50%;
margin-bottom:10px;
`
const Right = styled.div`
flex:1;
padding: 20px;
${mobile`
   background-color:gray;
  `}
`;
const ContactItem = styled.div`
  margin-bottom:20px;
  display: flex;
  align-items: center;

`
const Payment = styled.img``


const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>FASHION SHOP</Logo>
        <Desc>
          Celebrate the timeless elegance of Kerala's traditional wear for
          women, where every garment tells a story of heritage and grace. Our
          collection showcases the vibrant hues, intricate weaves, and exquisite
          embellishments that define the essence of Kerala's rich cultural
          tapestry. 
        </Desc>
        <SocialContainer>
            <SocialIcon color="#3B5999">
                <FacebookIcon />
            </SocialIcon >
            <SocialIcon color="#E4405F">
                <InstagramIcon />
            </SocialIcon>
            <SocialIcon color=" #FF0000">
                <YouTubeIcon />
            </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>use full links</Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>cart</ListItem>
            <ListItem>women fashion</ListItem>
            <ListItem>my account</ListItem>
            <ListItem>order traking</ListItem>
            <ListItem>whilist</ListItem>
            <ListItem>terms and conditions</ListItem>
        </List>
      </Center>
      <Right>
      <Title>Contact</Title>
        <ContactItem>
          <RoomIcon style={{marginRight:"10px"}}/> 555 HSR Layout , banglore 560102
        </ContactItem>
        <ContactItem>
          <PhoneIcon style={{marginRight:"10px"}}/> +91 9526661686
        </ContactItem>
        <ContactItem>
          <EmailOutlinedIcon style={{marginRight:"10px"}} /> womenfashion@gmail.com
        </ContactItem>
        {/* <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" /> */}
      </Right>
      
    </Container>
  );
};

export default Footer;
