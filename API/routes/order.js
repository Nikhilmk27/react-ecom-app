const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const bcrypt = require("bcrypt"); // Import bcrypt
const router = require("express").Router();
const Order = require("../models/Order")

// CREATE ORDER
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
    const newOrder = new Order(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// UPDATE ORDER
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

// // DELETE ORDER
router.delete("/:id",verifyTokenAndAdmin, async (req,res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("order has been deleted")
        
    } catch (error) {
        res.status(500).json(error.message)
    }

})

// // GET USER ORDERS
router.get("/find/:userId",verifyTokenAndAuthorization, async (req,res) => {
    try {
        const orders = await Order.findOne({userId:req.params.userId})
        res.status(200).json(orders)
        
    } catch (error) {
        res.status(500).json(error.message)
    }

})

//GET ALL ORDERS for admin

router.get("/",verifyTokenAndAdmin, async(req,res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(carts)
        
    } catch (error) {
       res.status(500).json(error) 
    }
})

//  GET MONTHELY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

  

module.exports = router;
