const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId,
       ref: 'User' },
    products: [
      {
        
      },
    ],
    totalPrice: {
      type: Number,
      default: 0
    },
  },
  
  { timestamps: true }
);

// Pre-save hook to calculate totalPrice
CartSchema.pre('save', function(next) {
  const cart = this;
  cart.totalPrice = cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  next();
});


module.exports = mongoose.model("Cart", CartSchema);
