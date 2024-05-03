import CartRepository from "../data/repository/CartRepository.js";
import ErrorClass from "../errors/api-handler.js";
import Utils from "../utils/index.js";
// import generateToken from '../middleware/generateToken.js'

export default class UserService {

  constructor() {
    this.repository = new CartRepository();
    this.util = new Utils();
    this.error = new ErrorClass();
  }

   async getAll(userId) {
     try {
       let cartItems = await this.repository.getAllCartItems(userId);
       console.log(cartItems);
      return cartItems
      // else
        // return this.error.Api_Error('Cannot fetch');
    } catch (err) {
      return this.error.Api_Error('Error', err);
    }
  }

  async addProduct(userId, product) {
    try {
      // console.log(product.product);
      const response = await this.repository.addProduct(userId, product.product);
      return response;
    } catch (error) {
      return this.error.Api_Error('Error', err.message);
    }
  }
  async removeProduct(userId, productId) {
    try {
      console.log(userId,  )
      const response = await this.repository.removeProduct(userId, productId);
      console.log(response);
      return response;
    } catch (error) {
      return this.error.Api_Error('Error', err.message);
    }
  }
  async manageProduct(userId, productId, unit) {
    try {
      if (unit == 0) {
        this.removeProduct(userId, productId);
        return 'Removed Product!!';
      }
      else {
        const response = await this.repository.updateUnit(userId, productId, unit);
        return response;
      }
    } catch (error) {
      return this.error.Api_Error('Error', error.message);
    }
  }

}