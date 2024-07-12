import { userRequest } from '../requestMethods';

export const createOrder = async (userId, products, amount,address) => {
  try {
    const response = await userRequest.post('/razorpay/createOrder', { userId, products, amount,address });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await userRequest.post('/razorpay/verify-payment', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// export const displayRazorpay = (order) => {
//   const options = {
//     key: 'rzp_test_b8r9QYFtn70jSl',
//     amount: order.amount,
//     currency: 'INR',
//     name: 'Your Company Name',
//     description: 'Order Description',
//     order_id: order.id,
//     handler: function (response) {
//       verifyPayment(response).then((data) => {
//         if (data.status === 'success') {
//           alert('Payment successful');
//         } else {
//           alert('Payment failed');
//         }
//       });
//     },
//     prefill: {
//       name: 'Customer Name',
//       email: 'customer@example.com',
//       contact: '1234567890'
//     },
//     notes: {
//       address: 'Corporate Office'
//     },
//     theme: {
//       color: '#F37254'
//     }
//   };

//   const rzp = new window.Razorpay(options);
//   rzp.open();
// };

export const displayRazorpay = (order) => {
  return new Promise((resolve, reject) => {
    const options = {
      key: 'rzp_test_b8r9QYFtn70jSl',
      amount: order.amount,
      currency: 'INR',
      name: 'FASHION',
      description: 'Order Description',
      order_id: order.id,
      handler: function (response) {
        resolve(response);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '1234567890'
      },
      notes: {
        address: 'Corporate Office'
      },
      theme: {
        color: '#F37254'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};
