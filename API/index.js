const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require("cors")
const userRout = require("./routes/user") 
const authRout = require("./routes/auth")
const productRout = require("./routes/product")
const orderRout = require("./routes/order")
const cartRout = require("./routes/cart")
const razorpayRout = require("./routes/razorpayOrders.js")
const Razorpay = require('razorpay');

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
dotenv.config();
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));




  mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("db connection sucessfull")
}).catch((err)=>{
console.log(err)
});

// Middleware to parse JSON


app.use("/api/user",userRout)
app.use("/api/auth",authRout)
app.use("/api/products",productRout)
app.use("/api/orders",orderRout)
app.use("/api/carts",cartRout)
app.use("/api/razorpay",razorpayRout)


app.listen(5000, () => {
  console.log("backend server is running!");
});
