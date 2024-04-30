import ErrorClass from "../../errors/api-handler.js";
import Order from "../models/OrderModel.js";
import Cart from '../models/CartModel.js';

export default class OrderRepository {

  constructor() {
    this.error = new ErrorClass()
  }

  async placeOrder(cart) {
    try {
      // Find the cart corresponding to the given customerId
      const orderId = Math.floor(Math.random() * (999999999999999 - 100000000000000 + 1)) + 100000000000000;
      const amount = cart.items.reduce((acc, item) => {
        return acc + item.product.price * item.unit
      }, 0);
      console.log(amount, orderId);

      const newOrder = await Order.create({
        orderId, amount, customerId: cart.customerId,
        status: 'In Process', items: cart.items
      });

      console.log(newOrder);

      await Cart.findByIdAndDelete(cart._id).then(res => console.log('Cart Emptied ', res) );

      return newOrder.orderId;
    } catch (error) {
      // Handle errors appropriately
      console.error("Error in placing orders :", error);
      return this.error.Api_Error("Failed to place product to cart", error.message);
    }s
  }

  async returnOrder(orderId) {
    try {
      const item = await Order.findByIdAndDelete({ _id: orderId });
      return item;
    } catch (error) {
      return this.error.Api_Error('return erorr', error.message);
    }
  }


  async getAllOrder(userId) {
    try {
      console.log(userId.customerId);
      const items = await Order.find({ customerId: userId.customerId });
      console.log(items);
      if (items.length == 0) return 'no orders yet';
      return items;
    } catch (error) {
      return this.error.Api_Error('Remove Product Error:', error.message)
    }
  }

  // async getProductByID(id) {
  //   try {
  //     console.log('Searching for product with ID:', id);
  //     const product = await Product.findOne({ _id: id });
  //     console.log('Product found:', product);
  //     return product;
  //   } catch (error) {
  //     return this.error.Api_Error('Remove Product Error:', error.message)
  //   }
  // }
}