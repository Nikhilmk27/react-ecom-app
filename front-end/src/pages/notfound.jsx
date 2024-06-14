// NotFound.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 50px;
`;

const Heading = styled.h1`
  font-size: 10em;
  margin: 0;
`;

const Message = styled.p`
  font-size: 1.5em;
  margin: 20px 0;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 1.2em;

  &:hover {
    text-decoration: underline;
  }
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <Heading>404</Heading>
      <Message>Oops! The page you're looking for doesn't exist.</Message>
      <StyledLink to="/">Go Back Home</StyledLink>
    </NotFoundContainer>
  );
}

export default NotFound;
