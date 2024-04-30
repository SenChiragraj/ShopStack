import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  customerId: { type: String },
  items: [
    {
      product: {
        _id : {type : String},
        title: { type: String },
        description: { type: String },
        price: { type: Number },
        discountPercentage: { type: Number },
        brand: { type: String },
        category: { type: String },
        thumbnail: { type: String },
      },
      unit: { type: Number, require: true }
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;