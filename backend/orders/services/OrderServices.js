import Order from "../data/models/OrderModel.js";
import OrderRepository from "../data/repository/OrderRepository.js";
import ErrorClass from "../errors/api-handler.js";

export default class OrderService {

  constructor() {
    this.repository = new OrderRepository();
    this.error = new ErrorClass();
  }

  async getAllOrder(userId) {
    try {
      // Find orders for the given customerId with pagination options
      const orders = await this.repository.getAllOrder({ customerId: userId });
      console.log(orders);
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  async returnOrder(orderId) {
    try {
      // Find orders for the given customerId with pagination options
      const orders = await this.repository.returnOrder(orderId);
      console.log(orders);
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  async placeOrder(cart) {
    try {

      const order = await this.repository.placeOrder(cart);
      return order;

    } catch (error) {
      this.error.Api_Error('getAllOrder Error', error.message);
    }
  }



};
