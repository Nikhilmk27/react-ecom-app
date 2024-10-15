// backend auth.js
const router = require("express").Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// REGISTER
router.post(
  "/register",
  [
    body("username").trim().isLength({ min: 3 }).escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const saltRounds = 10;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const otp = generateOTP();
      const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        otp,
        otpExpiration,
        isVerified: false,

      });

      await newUser.save();

      await sendVerificationEmail(email, otp);

      res
        .status(201)
        .json({
          message:
            "User registered. Please check your email for OTP verification.",
        });
    } catch (error) {
      console.error("Registration error:", error);
      res
        .status(500)
        .json({
          message: "An error occurred during registration. Please try again.",
        });
    }
  }
);

async function sendVerificationEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Your OTP for email verification is: ${otp}. This OTP will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}

// Verify OTP
router.post(
  "/verify-otp",
  [
    body("email").isEmail().normalizeEmail(),
    body("otp").isLength({ min: 6, max: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.isVerified) {
        return res.status(400).json({ message: "Email already verified" });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      if (user.otpExpiration < new Date()) {
        return res.status(400).json({ message: "OTP has expired" });
      }

      user.isVerified = true;
      user.otp = undefined;
      user.otpExpiration = undefined;
      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("OTP verification error:", error);
      res
        .status(500)
        .json({
          message:
            "An error occurred during OTP verification. Please try again.",
        });
    }
  }
);

// Resend OTP
router.post(
  "/resend-otp",
  [body("email").isEmail().normalizeEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.isVerified) {
        return res.status(400).json({ message: "Email already verified" });
      }

      const otp = generateOTP();
      const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

      user.otp = otp;
      user.otpExpiration = otpExpiration;
      await user.save();

      await sendVerificationEmail(email, otp);

      res
        .status(200)
        .json({ message: "New OTP sent. Please check your email." });
    } catch (error) {
      console.error("Resend OTP error:", error);
      res
        .status(500)
        .json({
          message: "An error occurred while resending OTP. Please try again.",
        });
    }
  }
);

// LOGIN
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.isVerified) {
        return res
          .status(403)
          .json({ message: "Please verify your email before logging in" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      const { password: _, ...userWithoutPassword } = user._doc;
      res.status(200).json({ ...userWithoutPassword, accessToken });

      // Check if the user has a cart already
      const existingCart = await Cart.findOne({ userId: user._id });
      if (!existingCart) {
        // Create a new cart for the user
        const newCart = new Cart({
          userId: user._id,
          products: [],
          quantity: 0,
          total: 0,
        });
        await newCart.save();
      }
    } catch (error) {
      console.error("Login error:", error);
      res
        .status(500)
        .json({ message: "An error occurred during login. Please try again." });
    }
  }
);

module.exports = router;

// 2 front end api calls.js
import { publicRequest } from "../requestMethods";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
} from "./userRedux";

export const signup = async (dispatch, user) => {
  dispatch(signupStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(signupSuccess());
    return { success: true, message: res.data.message };
  } catch (error) {
    dispatch(signupFailure());
    return {
      success: false,
      message:
        error.response?.data?.message || "Signup failed. Please try again.",
    };
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const res = await publicRequest.post("/auth/verify-otp", { email, otp });
    return { success: true, message: res.data.message };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "OTP verification failed. Please try again.",
    };
  }
};

export const resendOTP = async (email) => {
  try {
    const res = await publicRequest.post("/auth/resend-otp", { email });
    return { success: true, message: res.data.message };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to resend OTP. Please try again.",
    };
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return { success: true, user: res.data };
  } catch (error) {
    dispatch(loginFailure());
    return {
      success: false,
      message:
        error.response?.data?.message || "Login failed. Please try again.",
    };
  }
};

// 3 front end register.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup, verifyOTP, resendOTP } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signup(dispatch, { username, email, password });
    setIsLoading(false);
    if (result.success) {
      setShowOtpInput(true);
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await verifyOTP(email, otp);
    setIsLoading(false);
    setMessage(result.message);
    if (result.success) {
      // Redirect to login page
      navigate("/login");
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    const result = await resendOTP(email);
    setIsLoading(false);
    setMessage(result.message);
  };

  return (
    <div>
      <h2>Register</h2>
      {message && (
        <p
          className={
            message.includes("success") ? "success-message" : "error-message"
          }
        >
          {message}
        </p>
      )}
      {!showOtpInput ? (
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpVerification}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
          <button type="button" onClick={handleResendOTP} disabled={isLoading}>
            {isLoading ? "Resending..." : "Resend OTP"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;


WISH LIST

// wish list model
// models/Wishlist.js
const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', WishlistSchema);

// routes/wishlist.js
const router = require('express').Router();
const Wishlist = require('../models/Wishlist');
const { verifyToken } = require('./verifyToken');

// Add product to wishlist
router.post('/', verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.id, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user's wishlist
router.get('/', verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
    res.status(200).json(wishlist ? wishlist.products : []);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove product from wishlist
router.delete('/:productId', verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(id => id.toString() !== req.params.productId);
      await wishlist.save();
    }
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


Certainly! I'd be happy to help you implement a wishlist feature in your MERN project. We'll need to make changes on both the frontend and backend. Let's go through this step-by-step:
Backend:

First, let's create a Wishlist model:

javascriptCopy// models/Wishlist.js
const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', WishlistSchema);

Now, let's create a wishlist route:

javascriptCopy// routes/wishlist.js
const router = require('express').Router();
const Wishlist = require('../models/Wishlist');
const { verifyToken } = require('./verifyToken');

// Add product to wishlist
router.post('/', verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.id, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user's wishlist
router.get('/', verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
    res.status(200).json(wishlist ? wishlist.products : []);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove product from wishlist
router.delete('/:productId', verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(id => id.toString() !== req.params.productId);
      await wishlist.save();
    }
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

Add this route to your main app file

// index.js or app.js
const wishlistRoute = require('./routes/wishlist');
app.use('/api/wishlist', wishlistRoute);

// REDUX SLICE FOR WISHLIST


// API CALLS FOR WISHLIST OPERATION




// ADD A ADDTOWISHLIST BUTTON IN PRODUCT COMPONENT
// components/Product.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../redux/apiCalls';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    addToWishlist(dispatch, product._id);
  };

  return (
    <div>
      {/* Your existing product display code */}
      <button onClick={handleAddToWishlist}>Add to Wishlist</button>
    </div>
  );
};

export default Product;

// ADD  ROUT FOR THE WISHLIST COMPONENT
import Wishlist from './components/Wishlist';

// In your routes
<Route path="/wishlist" element={<Wishlist />} />

  
