const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const bcrypt = require("bcrypt"); // Import bcrypt
const User = require("../models/User"); // Assuming User model is in the models folder

const router = require("express").Router();

// edit user
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        try {
            const saltRounds = 10; // Define salt rounds
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            });
            req.body.password = hashedPassword; // Assign hashed password back to req.body.password
        } catch (err) {
            return res.status(500).json({ error: "Error hashing password" });
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete user
router.delete("/:id",verifyTokenAndAuthorization, async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")
        
    } catch (error) {
        res.status(500).json(error.message)
    }

})

// get user rout
router.get("/find/:id",verifyTokenAndAdmin, async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        const{password,...others} = user._doc;
        res.status(200).json(others)
        
    } catch (error) {
        res.status(500).json(error.message)
    }

})

// get all users
router.get("/",verifyTokenAndAdmin, async (req,res) => {
    const query = req.query.new;
    try {
        const users = query 
        ?await User.find().sort({_id : -1}).limit(5)
        :await User.find();
        res.status(200).json(users)
        
    } catch (error) {
        res.status(500).json(error.message)
    }

})
//GET USER STATS

router.get("/status", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
