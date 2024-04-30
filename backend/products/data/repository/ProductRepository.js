import Product from "../models/ProductModel.js";

export default class ProductRepository {

  // async FindUser(email) {
  //   try {
  //     const user = await User.findOne({ email });
  //     if (user) {
  //       return user;
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async addProduct(productInfo) {
    try {
      const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = productInfo;
      await Product.create({
        title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images
      });
      return "Product added successfully";

    } catch (error) {
      console.log('Create User :', error);
    }
  }

  async getAllProduct() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.log('Get All User :', error);
    }
  }

  async getProductByID(id) {
    try {
      const product = await Product.findOne({ _id: id });
      return product;
    } catch (error) {
      console.log('Get Product By ID Error:', error);
      throw error;
    }
  }
}