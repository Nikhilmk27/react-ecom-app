// import axios from "axios";
// import Cookies from "js-cookie";
// const BASE_URL = "http://localhost:5000/api/";
// // const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjA0MGMxMjNhYjkyOWU2OTg5OGJhZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxODE4MzIxNCwiZXhwIjoxNzE4NDQyNDE0fQ.Lieyte9CbjfgSZCPHr4ISjj2ZqZXoKfcq4iVoW-29_A"

// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
// });
// userRequest.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


// // axios for logging requests
// // Log requests and responses for public requests
// publicRequest.interceptors.request.use(
//   (config) => {
//     console.log('Public Request:', config);
//     return config;
//   },
//   (error) => {
//     console.error('Public Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// publicRequest.interceptors.response.use(
//   (response) => {
//     console.log('Public Response:', response);
//     return response;
//   },
//   (error) => {
//     console.error('Public Response Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Log requests and responses for user requests
// userRequest.interceptors.request.use(
//   (config) => {
//     console.log('User Request:', config);
//     return config;
//   },
//   (error) => {
//     console.error('User Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// userRequest.interceptors.response.use(
//   (response) => {
//     console.log('User Response:', response);
//     return response;
//   },
//   (error) => {
//     console.error('User Response Error:', error);
//     return Promise.reject(error);
//   }
// );

import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:5000/api/";

// Creating Axios instances for public and user requests
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Interceptors for public requests

// Log public request details
publicRequest.interceptors.request.use(
  (config) => {
    console.log('Public Request:', config);
    return config;
  },
  (error) => {
    console.error('Public Request Error:', error);
    return Promise.reject(error);
  }
);

// Log public response details
publicRequest.interceptors.response.use(
  (response) => {
    console.log('Public Response:', response);
    return response;
  },
  (error) => {
    console.error('Public Response Error:', error);
    return Promise.reject(error);
  }
);

// Interceptors for user requests

// Add token to user request headers and log request details
userRequest.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('User Request:', config);
    return config;
  },
  (error) => {
    console.error('User Request Error:', error);
    return Promise.reject(error);
  }
);

// Log user response details
userRequest.interceptors.response.use(
  (response) => {
    console.log('User Response:', response);
    return response;
  },
  (error) => {
    console.error('User Response Error:', error);
    return Promise.reject(error);
  }
);
