import styled from "styled-components"
import { mobile } from "../responsive"
import { useState } from "react"
import {login} from "../redux/apiCalls"
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { loginSucess } from "../redux/userRedux"
import { setCart,clearCart } from "../redux/cartRedux"
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';


const Login = () => {
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const dispatch = useDispatch()
  const{isFetching,error} = useSelector((state) => state.user)
  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch,{email,password})
  }
  return (
    <>
    <Navbar/>
    <Container>
    <Wraper>
        <Title>SIGN IN</Title>
        <Form>
            <Input placeholder="email id"
            onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="password"
            type="password"
             onChange={(e) => setPassword(e.target.value)}/>
            <LoginButton onClick={handleClick} disabled={isFetching}>LOGIN</LoginButton>
            {error && <Error>something went wrong</Error>}
            <Links>forgot password?</Links>
            <Link to="/register">
            <Links to="/register"> dont have an account? sign up</Links>
            </Link>

        </Form>

    </Wraper>
    

</Container>
</>
  )
}


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
margin: 0;
padding: 0;

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
&:disabled{
  background-color:aqua;
  color:green;
  cursor: not-allowed;
}

`
const Links = styled.a`
margin: 5px 0px;
font-size: 12px;
cursor: pointer;
    
`
const Error = styled.span`
color:red;
`
export default Login