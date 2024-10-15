const router = require("express").Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

// CREATE A TRANSPORTER FOR SENDING EMAILS
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Gmail SMTP server hostname
  port: 587, // Port for TLS/STARTTLS
  secure: false, // Set to true if using SSL/TLS
  auth: {
    user: "nikhil2779526@gmail.com", 
    pass: "kmzp ykyv qkzl izpn", // App-specific password generated for Node Mailer
  },
});
// Function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
// REGISTER WITH EMAIL OTP VERIFICATION
router.post("/register",[
  body("username").trim().isLength({ min: 3 }).escape(),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {username,email} = req.body
  const myPlaintextPassword = req.body.password;
  const saltRounds = 10;

  try {
    // Hash the password
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpiration,
      isVerified: false,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

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
  
});
async function sendVerificationEmail(email, otp) {
  const mailOptions = {
    from: "nikhil2779526@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Your OTP for email verification is: ${otp}. This OTP will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}

// Verify OTP
// router.post(
//   "/verify-otp",
//   [
//     body("email").isEmail().normalizeEmail(),
//     body("otp").isLength({ min: 6, max: 6 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, otp } = req.body;

//     try {
//       const user = await User.findOne({ email });

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       if (user.isVerified) {
//         return res.status(400).json({ message: "Email already verified" });
//       }

//       if (user.otp !== otp) {
//         return res.status(400).json({ message: "Invalid OTP" });
//       }

//       if (user.otpExpiration < new Date()) {
//         return res.status(400).json({ message: "OTP has expired" });
//       }

//       user.isVerified = true;
//       user.otp = undefined;
//       user.otpExpiration = undefined;
//       await user.save();

//       res.status(200).json({ message: "Email verified successfully" });
//     } catch (error) {
//       console.error("OTP verification error:", error);
//       res
//         .status(500)
//         .json({
//           message:
//             "An error occurred during OTP verification. Please try again.",
//         });
//     }
//   }
// );

router.post("/verify-otp", 
  [
    body("email").isEmail().normalizeEmail(),
    body("otp").isLength({ min: 6, max: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, otp } = req.body;

      console.log("Received OTP verification request:", { email, otp });

      const user = await User.findOne({ email });
      console.log("User found:", user);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.isVerified) {
        return res.status(400).json({ message: "Email already verified" });
      }

      console.log("Stored OTP:", user.otp);
      console.log("OTP Expiration:", user.otpExpiration);

      if (user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      if (user.otpExpiration < new Date()) {
        return res.status(400).json({ message: "OTP has expired" });
      }

      user.isVerified = true;
      user.otp = null;
      user.otpExpiration = null;
      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({
        message: "An error occurred during OTP verification. Please try again.",
        error: error.message
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
// REGISTER
// router.post("/register", async (req, res) => {
//   const myPlaintextPassword = req.body.password;
//   const saltRounds = 10;

//   try {
//     // Hash the password
//     const hashedPassword = await new Promise((resolve, reject) => {
//       bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(hash);
//         }
//       });
//     });

//     // Create a new user with the hashed password
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     // Save the new user to the database
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// LOGIN ROUT
// router.post("/login", async (req, res) => {
//   try {
//     const data = req.body;
//     const email = req.body.email;
//     let userExist = await User.findOne({ email: email });
//     if (userExist) {
//       const match = await bcrypt.compare(req.body.password, userExist.password);
//       if (match) {
//         const accessToken = jwt.sign(
//           {
//             id: userExist._id,
//             isAdmin: userExist.isAdmin,
//           },
//           process.env.JWT_SEC,
//           { expiresIn: "3d" }
//         );
//         const { password, ...others } = userExist._doc;
//         res.status(200).json({ ...others, accessToken });
//         // chek if theuser has a cat alredy
//         const existingCart = await Cart.findOne({ userId: userExist._id });
//         if (!existingCart) {
//           // ceate a new cart for the user
//           const newCart = new Cart({
//             userId: userExist._id,
//             products: [],
//             quantity: 0,
//             total: 0,
//           });
//           await newCart.save();
//         }
//       }
//     } else {
//       res.status(500).json("wrong password");
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// });

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

router.get("/verify", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;

