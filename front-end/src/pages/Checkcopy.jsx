import styled,{ css } from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import { createOrder,displayRazorpay,verifyPayment } from "../services/razorpayServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartRedux";
import { persistor } from "../redux/store";
import { clearUserCart } from "../redux/apiCalls";



const Checkout = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();
  // razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const [order,setOrder] = useState(null)
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.user.currentUser._id);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalItems = cart.products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = cart.products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleCheckout = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    
    const address = {
      email : form.email.value,
      deliveryAddress: form.address.value,
      country: form.country.value,
      state: form.state.value,
      pin: form.pin.value,
      mobile:form.mobile.value
    };
    const amount = cart.total;
    const products = cart.products


    try {
      // Step 1: Create order on the backend
      const newOrder = await createOrder(userId, products, amount,address);
      setOrder(newOrder);
      console.log(newOrder)

      // Step 2: Open Razorpay payment form
      const paymentResult = await displayRazorpay(order);
      // Step 3: Verify the payment
      const verificationResult = await verifyPayment(paymentResult);
      console.log("verification ressult")
      console.log(verificationResult)
      if (verificationResult.status === 'success') {
        // Payment successful
        alert('Payment successful!');
        
        // Clear the cart
        dispatch(clearCart());
        // clear user cart in the backend
        dispatch(clearUserCart(userId))


         // Force a reload of the persist store
         await persistor.purge();
 
        
        // // Redirect to home page
         navigate('/', { replace: true });
      } else {
        // Payment failed
        alert('Payment verification failed. Please try again or contact support.');
      }

    } catch (error) {
      console.error("Error in payment process:", error);
    }
  };

  return (
    <>
      <GlobalStyle /> {/* Apply global styles */}
      <Navbar />
      <CheckoutHead>
        <h1>CHECKOUT</h1>
      </CheckoutHead>
      <ContentSection>
        <LeftSection>
          <OrderForm onSubmit={handleCheckout}>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="full name"
              required
            />
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              required
            />
            <Input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="mobile"
              required
            />
            <AddressTextArea
              id="address"
              name="address"
              placeholder="delivery address"
              required
            />
            <PinStateCountry>
              <Select id="country" name="country" required>
                <option value="" disabled selected>
                  Country
                </option>
                <option value="india">India</option>
              </Select>

              <Select id="state" name="state" required>
                <option value="" disabled selected>
                  State
                </option>
                <option value="maharashtra">Kerala</option>
                <option value="california">Karnataka</option>
                <option value="ontario">Tamilnadu</option>
              </Select>
              <Pincode>
                <Input
                  type="number"
                  id="pin"
                  name="pin"
                  placeholder="PIN code"
                  required
                />
              </Pincode>
            </PinStateCountry>

            <CheckoutButton type="submit">checkout</CheckoutButton>
          </OrderForm>
        </LeftSection>
        <RightSection>
        <TableContainer>
          <Orderdetails>ORDER DETAILS</Orderdetails>
          
        <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product._id}>
              <Td>{product.title}</Td>
              <Td><img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} /></Td>
              <Td>{product.quantity}</Td>
              <Td>{product.price}</Td>
            </tr>
          ))}
          <TotalRow>
            <Td colSpan="3">TOTAL</Td>
            <Td>{cart.total}</Td>
          </TotalRow>
        </tbody>
      </Table>
      
      <Pagination>
        <PageButton onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</PageButton>
        <PageButton onClick={handleNextPage} disabled={currentPage === totalPages}>Next</PageButton>
      </Pagination>
      </TableContainer>
        </RightSection>
      </ContentSection>
      <Footer />
    </>
  );
};


// Global CSS reset to ensure no default margins or paddings
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
  }
`;

const CheckoutHead = styled.div`
  text-align: center;
  background-color: #2c302b;
  margin: 0;
  padding: 5px;
  h1 {
    margin: 0;
    font-size: 15px;
    color:white;
  }
`;

const ContentSection = styled.div`
  display: flex;
  background-color: blue;
  height: 95vh;
  margin: 0;
  padding: 0;
`;

const LeftSection = styled.div`
  flex: 1;
  height: 95vh;
  overflow: hidden;
`;

const RightSection = styled.div`
  flex: 1;
  height: 95vh;
  overflow: hidden;
  background-color:  #9a9e97;
`;

const Input = styled.input`
  padding: 5px;
  border: 2px solid #eef5ef;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px;
  outline: none;
  background: transparent;
  /* Conditional styling based on id */
  ${props =>
    props.id === 'pin' &&
    css`
      width: 30vh;
    `}
  &::placeholder {
    color: #50ca58; /* Change this to your desired placeholder color */
  }
  &:focus {
    border-color: #9aff34; /* Optional: Change the border color on focus */
  }
`;

const OrderForm = styled.form`
  display: flex;
  flex-direction: column;
  background-image: url("https://i.pinimg.com/736x/16/aa/33/16aa33e04b1cdad34f6480221b789863.jpg");
  padding: 30px 20px 20px 20px;
  background-size: cover;
  background-position: center;
  height: 95vh;
`;
const CheckoutButton = styled.button`
  margin-top: 10px;
  width: 25vh;
  height: 8vh;
  margin-bottom: 0;
  margin-left:30vh;
`;
const AddressTextArea = styled.textarea`
  height: 50px;
  padding: 5px;
  border: 2px solid #eef5ef;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px;
  outline: none;
  background: transparent;
  color: #d4145a;
  &::placeholder {
    color: #50ca58; /* Change this to your desired placeholder color */
  }
  &:focus {
    border-color: #9aff34; /* Optional: Change the border color on focus */
  }
`;
const PinStateCountry = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Select = styled.select`
  padding: 5px;
  border: 2px solid #7c827a;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px;
  outline: none;
  background: transparent;
  width: 30vh;
  &:focus {
    border-color: #007bff; /* Optional: Change the border color on focus */
  }
`;
const Pincode = styled.div`
  width: 30vh;
`;
// right section tble style
const Orderdetails = styled.h3`
 text-align:center;
 background-color:#494d46;
 color: aliceblue;
 font-weight:5;
`;
const TableContainer = styled.div`
  background-color: #494d46;
  margin:10px 10px 10px 10px;

`
const Table = styled.table`
  width: 100%;
  color:aliceblue ;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #8f9888;
  padding: 5px;
  text-align: left;
`;

const Td = styled.td`
padding: 5px;
  border-bottom: 1px solid #ffffff;
`;

const TotalRow = styled.tr`
  background-color: #5a5f5b;
  font-weight: bold;
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 10px 10px 5px;
  padding: 5px 10px;
  border: none;
  background-color: #2c302b;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
export default Checkout;
