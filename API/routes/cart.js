const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const bcrypt = require("bcrypt"); // Import bcrypt
const router = require("express").Router();
const Cart = require("../models/Cart")
const mongoose = require("mongoose")

// CREATE Cart
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
  
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// EDIT CART
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// // DELETE CART
router.delete("/:id",verifyTokenAndAuthorization, async (req,res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("cart has been deleted")
        
    } catch (error) {
        res.status(500).json(error.message)
    }

})

// // GET USER CART
router.get("/find/:userId", async (req,res) => {
    try {
        const cart = await Cart.findOne({userId:req.params.userId})
        res.status(200).json(cart)
        
    } catch (error) {
        res.status(500).json(error.message)
    }

})

//GET ALL CART for admin

router.get("/",verifyTokenAndAdmin, async(req,res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
        
    } catch (error) {
       res.status(500).json(error) 
    }
})

// app product to cart
// ADD PRODUCT TO USER CART
router.post("/add/:userId", async (req, res) => {
    try {
        // Find the cart for the specified user
        const cart = await Cart.findOne({ userId: req.params.userId });

        // If the cart doesn't exist, return a 404 error
        if (!cart) {
            return res.status(404).json("Cart not found");
        }

        const product = req.body;

        // Check if the product ID is provided
        if (!product.productId || !product.quantity) {
            return res.status(400).json("Product ID and quantity are required");
        }

        // Ensure cart.products is an array
        if (!Array.isArray(cart.products)) {
            cart.products = [];
        }

        // Find the index of the existing product in the cart
        const existingProductIndex = cart.products.findIndex(p => p.productId === product.productId);

        // If the product exists in the cart, update the quantity, otherwise add the new product
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += product.quantity;
        } else {
            cart.products.push(product);
        }

        // Save the updated cart and send it in the response
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        // Log the error and send a 500 status with the error message
        console.error("Error adding product to cart:", error);
        res.status(500).json(error.message);
    }
});

// delete product from cart
router.delete("/remove/:userId/:productId", async (req, res) => {
    try {
        const ObjectId = mongoose.Types.ObjectId;
        const userobjid = new ObjectId(req.params.userId);
        // Find the cart for the specified user
        const user = req.params.userId
        const cart = await Cart.findOne({userId:userobjid});

        // If the cart doesn't exist, return a 404 error
        if (!cart) {
            return res.status(404).json("Cart not found");
        }

        // Find the index of the product to be removed in the cart
        const productIndex = cart.products.findIndex(p => p.productId === req.params.productId);

        // If the product doesn't exist in the cart, return a 404 error
        if (productIndex === -1) {
            return res.status(404).json("Product not found in cart");
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        // Save the updated cart and send it in the response
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        // Log the error and send a 500 status with the error message
        console.error("Error removing product from cart:", error);
        res.status(500).json(error.message);
    }
});


  

module.exports = router;
