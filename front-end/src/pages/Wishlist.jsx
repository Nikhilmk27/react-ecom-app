import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWishlist, removeFromWishlist } from '../redux/wishlistApiCalls';
import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

// Global style to prevent unnecessary scroll on the body
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevent extra scroll on body */
  }
`;

const WishlistContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  height: calc(100vh - 60px); /* Adjusted to remove navbar height */
  overflow-y: auto; /* Allow scroll only inside the container */
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* Reduced min-width */
  gap: 15px; /* Reduced gap for more compact look */
`;

const ProductItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  max-height: 350px; /* Max height for uniform sizing */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 80%; /* Reduced for smaller image */
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 10px; /* Reduced padding */
`;

const ProductTitle = styled.h3`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
  text-align: center;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #e91e63;
  margin-bottom: 5px;
  text-align: center;
`;

const RemoveButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.products);

  useEffect(() => {
    getWishlist(dispatch);
  }, [dispatch]);

  const handleRemove = (productId) => {
    removeFromWishlist(dispatch, productId);
  };

  return (
    <>
      <GlobalStyle /> {/* Apply the global style to avoid extra scroll */}
      <Navbar />
      <WishlistContainer>
        <Title>My Wishlist</Title>
        <ProductGrid>
          {wishlist.map((product) => (
            <ProductItem key={product._id}>
              <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                <ImageContainer>
                  <Image src={product.image} alt={product.title} />
                </ImageContainer>
                <ProductTitle>{product.title}</ProductTitle>
              </Link>
              <ProductInfo>
                <ProductPrice>₹{product.price}</ProductPrice>
                <RemoveButton onClick={() => handleRemove(product._id)}>Remove</RemoveButton>
              </ProductInfo>
            </ProductItem>
          ))}
        </ProductGrid>
      </WishlistContainer>
    </>
  );
};

export default Wishlist;
