const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const bcrypt = require("bcrypt"); // Import bcrypt
const router = require("express").Router();
const Cart = require("../models/Cart")

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

  

module.exports = router;
