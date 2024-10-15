const router = require("express").Router();
const Wishlist = require('../models/Wishlist')
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

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