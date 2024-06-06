import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
width: 100%;
height: 100vh;
background: linear-gradient(
    to bottom, rgba(0, 128, 0, 0.5), rgba(0, 255, 0, 0.5)

), url("https://media.istockphoto.com/id/1398610798/photo/young-woman-in-linen-shirt-shorts-and-high-heels-pointing-to-the-side-and-talking.jpg?s=612x612&w=0&k=20&c=JULY1xsUtiur9QPMxqrzgC2VbnhuT4dSnHWcpFQnuAQ=");
background-repeat:no-repeat;
background-size:100vw;
display: flex;
align-items: center;
justify-content:center;
${mobile`
    width:100vw;
    height:150vh;
  `}
`
const Wrapper = styled.div`
width: 40%;
padding: 20px;
border: 2px solid black;
margin: 0 auto;
${mobile`
    width:75%;
    padding: 20px 10px;
  `}

`
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
text-align:center;
`
const Form = styled.form`
display: flex;
flex-wrap:wrap;
align-items: center;
justify-content: center;

`
const Input = styled.input`
flex:1;
min-width:40%;
margin: 20px 10px 0px 0px;
padding: 10px;
background-color:transparent;
color: white;
&::placeholder {
    color: yellow; /* Placeholder text color */
  }

`
const Agreement = styled.span`
font-size:12px;
margin: 20px 0px;
`
const CreateButton = styled.button`
width: 40%;
border:2px solid black;
padding: 10px 15px;
background-color:transparent;
color: yellow;
cursor: pointer;
margin-bottom:5px;

`
const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <CreateButton>CREATE</CreateButton>
        </Form>
      </Wrapper>
    </Container>

  )
}

export default Register