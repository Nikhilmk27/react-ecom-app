const router = require("express").Router();
const User = require("../models/User");
const Cart = require("../models/Cart")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// REGISTER
router.post("/register", async (req, res) => {
    const myPlaintextPassword = req.body.password;
    const saltRounds = 10;

    try {
        // Hash the password
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });

        // Create a new user with the hashed password
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// login
router.post("/login",async(req,res) => {
    
        try {
          const data = req.body;
          const email = req.body.email;
          let userExist = await User.findOne({ email: email });
          if (userExist) {
            const match = await bcrypt.compare(req.body.password, userExist.password);
            if (match) {
              
              const accessToken = jwt.sign({
                id:userExist._id,
                  isAdmin:userExist.isAdmin
              },process.env.JWT_SEC,{expiresIn:"3d"})
              const {password,...others} = userExist._doc;
              res.status(200).json({...others,accessToken})
              // chek if theuser has a cat alredy
              const existingCart = await Cart.findOne({userId :userExist._id})
              if(!existingCart){
                // ceate a new cart for the user
                const newCart = new Cart({
                  userId: userExist._id,
                  products: [],
                  quantity: 0,
                  total: 0,
                });
                await newCart.save()
              }
            }
          } else {
            res.status(500).json("wrong password")
          }
        } catch (error) {
          console.log(error.message);
        }
     
})


module.exports = router;


//   const cartData = { userId: userExist._id, products: [], quantity: 0, total: 0 };
//   dispatch(setCart(cartData));

//   res.status(200).json(userData);
// } else {
//   res.status(401).json("Wrong password");
// }
// } else {
// res.status(404).json("User not found");
// }
// } catch (error) {
// console.log(error.message);
// res.status(500).json("Server error");
// }
// });