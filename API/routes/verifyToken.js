// const jwt = require("jsonwebtoken")

// const verifyToken = (req,res,next) => {
//     const authHeader = req.headers.Authorization
//     if(authHeader){
//         const token = authHeader.split(" ")[1]
//         jwt.verify(token,process.env.JWT_SEC,(err,user) =>{
//             if(err) res.status(403).json("toke is not valid")
//                 req.user = user;
//             next();
//         })

//     }else{
//         return res.status(401).json("you are not authenticted")

//     }
// }

// const verifyTokenAndAuthorization = (req,res,next) =>{
//     verifyToken(req,res,()=>{
//         if(req.user.id === req.params.id || req.user.isAdmin){
//             next()
//         }else{
//             res.status(403).json("you are not allowed to do that")
//         }
//     })
// }

// const verifyTokenAndAdmin = (req,res,next) =>{
//     verifyToken(req,res,()=>{
//         if(req.user.isAdmin){
//             next()
//         }else{
//             res.status(403).json("you are not allowed to do that")
//         }
//     })
// }

// module.exports = {
//     verifyToken,
//     verifyTokenAndAuthorization,
//     verifyTokenAndAdmin,

// }

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        console.log("Token verification failed:", err);
        return res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    console.log("No Authorization header found");
    return res.status(401).json("You are not authenticated");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      console.log("User not authorized:", req.user.id, req.params.userId);
      res.status(403).json("You are not allowed to do that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      console.log("User is not admin:", req.user.id);
      res.status(403).json("You are not allowed to do that");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};