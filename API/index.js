const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRout = require("./routes/user") 
const authRout = require("./routes/auth")
const productRout = require("./routes/product")
const orderRout = require("./routes/order")
const cartRout = require("./routes/cart")

dotenv.config();

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{
    console.log("db connection sucessfull")
}).catch((err)=>{
console.log(err)
});

// Middleware to parse JSON
app.use(express.json());
app.use("/api/user",userRout)
app.use("/api/auth",authRout)
app.use("/api/products",productRout)
app.use("/api/orders",orderRout)
app.use("api/carts",cartRout)




app.listen(5000, () => {
  console.log("backed server is running!");
});
