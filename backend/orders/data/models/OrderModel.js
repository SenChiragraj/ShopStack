import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String },
  customerId: { type: String },
  amount: { type: Number },
  status: { type: String },
  items: [
    {
      product: {
        _id: { type: String, require: true },
        title: { type: String },
        price: { type: Number },
        discountPercentage: { type: Number },
        brand: { type: String },
        category: { type: String },
        thumbnail: { type: String },
      },
      unit: { type: Number, require: true }
    }
  ]
})

const Order = mongoose.model('Order', orderSchema);
export default Order;