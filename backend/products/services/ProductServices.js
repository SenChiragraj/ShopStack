import ProductRepository from "../data/repository/ProductRepository.js";
import ErrorClass from "../errors/api-handler.js";
// import generateToken from '../middleware/generateToken.js'

export default class UserService {

  constructor() {
    this.repository = new ProductRepository();
    this.error = new ErrorClass();
  }

  async addProduct(productInfo) {
    try {
      // const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = userInfo;
      const response = await this.repository.addProduct(productInfo);
      return response;
    } catch (error) {

    }
}

  async getAll() {
    try {
      let product = await this.repository.getAllProduct();
      if (product)
        return product;
      else
        return this.error.Api_Error('Cannot fetch');
    } catch (err) {
      return this.error.Api_Error('Error', err.message);
    }
  }

  async findProduct(id) {
    try {
      let product = await this.repository.getProductByID(id);
      if (product)
        return product;
      else
        return this.error.Api_Error('Cannot fetch');
    } catch (err) {
      return this.error.Api_Error('Error', err.message);
    }
  }

}