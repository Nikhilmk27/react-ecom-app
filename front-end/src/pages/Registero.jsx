import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import validationSchema from '../validationSchema';
import { mobile } from '../responsive';
import Navbar from '../components/Navbar';
import { useDispatch,useSelector } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../redux/userRedux';
import {signup} from "../redux/apiCalls"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signupSuccessReset } from '../redux/userRedux';





const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { isFetching, error, signupSuccess } = useSelector((state) => state.user);
  const [notification, setNotification] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await signup(dispatch, values);
    },
  });
  useEffect(() => {
    if (signupSuccess) {
      setNotification('Signup successful! Redirecting to login page...');
      setTimeout(() => {
        navigate('/login');
        dispatch(signupSuccessReset());
      }, 3000);
    }
  }, [signupSuccess, navigate,dispatch]);

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          {notification && <Notification>{notification}</Notification>}
          <Form onSubmit={formik.handleSubmit}>
            <InputField>
              <Input
                placeholder="name"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && formik.errors.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <ErrorText>{formik.errors.name}</ErrorText>
              ) : null}
            </InputField>

            <InputField>
              <Input
                placeholder="last name"
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                error={formik.touched.lastName && formik.errors.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <ErrorText>{formik.errors.lastName}</ErrorText>
              ) : null}
            </InputField>

            <InputField>
              <Input
                placeholder="username"
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                error={formik.touched.username && formik.errors.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <ErrorText>{formik.errors.username}</ErrorText>
              ) : null}
            </InputField>

            <InputField>
              <Input
                placeholder="email"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <ErrorText>{formik.errors.email}</ErrorText>
              ) : null}
            </InputField>

            <InputField>
              <Input
                placeholder="password"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.touched.password && formik.errors.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <ErrorText>{formik.errors.password}</ErrorText>
              ) : null}
            </InputField>

            <InputField>
              <Input
                placeholder="confirm password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <ErrorText>{formik.errors.confirmPassword}</ErrorText>
              ) : null}
            </InputField>

            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <CreateButton type="submit" disabled={isFetching} >CREATE</CreateButton>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      to bottom, rgba(0, 128, 0, 0.5), rgba(0, 255, 0, 0.5)
    ),
    url("https://media.istockphoto.com/id/1398610798/photo/young-woman-in-linen-shirt-shorts-and-high-heels-pointing-to-the-side-and-talking.jpg?s=612x612&w=0&k=20&c=JULY1xsUtiur9QPMxqrzgC2VbnhuT4dSnHWcpFQnuAQ=");
  background-repeat: no-repeat;
  background-size: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile`
    width: 100vw;
    height: 150vh;
  `}
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 10px;
  border: 2px solid black;
  margin: 0 auto;
  ${mobile`
    width: 75%;
    padding: 20px 10px;
  `}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const InputField = styled.div`
  width: 40%;
  margin-bottom: 15px;
  position: relative;
  ${mobile`
    width: 100%;
    padding: 5px 5px;
  `}
`;

const Input = styled.input`
  flex: 1;
  width: 80%;
  padding: 10px;
  background-color: transparent;
  color: white;
  border: ${(props) => (props.error ? '1px solid red' : '1px solid black')};
  &::placeholder {
    color: yellow; /* Placeholder text color */
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  position: absolute;
  top: 100%;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const CreateButton = styled.button`
  width: 40%;
  border: 2px solid black;
  padding: 10px 15px;
  background-color: transparent;
  color: yellow;
  cursor: pointer;
  margin-bottom: 5px;
`;

const Notification = styled.div`
  color: #f6f20a;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;
export default Register;
