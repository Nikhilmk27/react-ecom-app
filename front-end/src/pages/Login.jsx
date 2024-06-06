import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
width: 100%;
height: 100vh;
background: linear-gradient(
    to bottom, rgba(77, 94, 77, 0.5), rgba(0, 255, 0, 0.5)

), url("https://media.istockphoto.com/id/1398610798/photo/young-woman-in-linen-shirt-shorts-and-high-heels-pointing-to-the-side-and-talking.jpg?s=612x612&w=0&k=20&c=JULY1xsUtiur9QPMxqrzgC2VbnhuT4dSnHWcpFQnuAQ=");
background-repeat:no-repeat;
background-size:cover;
display: flex;
align-items: center;
justify-content:center;

`
const Wraper = styled.div`
width: 40%;
padding: 20px;
border: 2px solid black;
${mobile`
    width:75%;
  `}

`
const Title = styled.h1`
font-size: 24px;
font-weight: 300;
text-align:center;
`
const Form = styled.form`
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;

`
const Input = styled.input`
flex:1;
min-width:40%;
margin: 10px 0px;
padding: 10px;
background-color:transparent;
color: white;
&::placeholder {
    color: yellow; /* Placeholder text color */
  }

`

const LoginButton = styled.button`
width: 40%;
border:2px solid black;
padding: 10px 15px;
background-color:transparent;
color: yellow;
cursor: pointer;

`
const Link = styled.a`
margin: 5px 0px;
font-size: 12px;
cursor: pointer;
    
`
const Login = () => {
  return (
    <Container>
    <Wraper>
        <Title>SIGN IN</Title>
        <Form>
            <Input placeholder="user name"/>
            <Input placeholder="password"/>
            <LoginButton>LOGIN</LoginButton>
            <Link>forgot password?</Link>
            <Link>dont have an account? sign up</Link>

        </Form>

    </Wraper>

</Container>
  )
}

export default Login