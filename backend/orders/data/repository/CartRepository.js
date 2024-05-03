import ErrorClass from "../../errors/api-handler.js";
import Cart from "../models/CartModel.js";

export default class CartRepository {

  constructor() {
    this.error = new ErrorClass()
  }

  // async addProduct(customerId, product) {
  //   try {
  //     // Find the cart corresponding to the given customerId
  //     console.log(customerId);
  //     const cart = await Cart.findOne({ customerId: customerId });
  //     console.log(cart);
  //     console.log(product)
  //     if (!cart) {
  //       // If cart doesn't exist, create a new cart with the given product
  //       const newCart = await Cart.create({
  //         customerId,
  //        items: [{...product, unit: 1 }]
  //       });
  //       console.log(newCart);
  //       return newCart.items;
  //     } else {
  //       // If cart exists, push the new product into the items array
  //       cart.items.push({ product: product, unit: 1 });
  //       // Save the updated cart
  //       await cart.save();
  //       return cart.items;
  //     }
  //   } catch (error) {
  //      return this.error.Api_Error('Cannot fetch')
  //   }
  // };

  async addProduct(customerId, product) {
    try {
      // Find the cart corresponding to the given customerId
      const cart = await Cart.findOne({ customerId });

      if (!cart) {
        // If cart doesn't exist, create a new cart with the given product
        const newCart = await Cart.create({
          customerId,
          items: [{ product, unit: 1 }]
        });
        return {message : "Item added"};
      } else {
        // If cart exists, push the new product into the items array
        const existingItemIndex = cart.items.findIndex(item => item.product._id === product._id);
        if (existingItemIndex !== -1) {
          // If the product already exists in the cart, increase its unit count
          cart.items[existingItemIndex].unit += 1;
        } else {
          // If the product is not in the cart, add it as a new item
          cart.items.push({ product, unit: 1 });
        }
        // Save the updated cart
        await cart.save();
        return {message : "Item added"};
      }
    } catch (error) {
      // Handle errors appropriately
      console.error("Error adding product to cart:", error);
      throw new Error("Failed to add product to cart");
    }
  }
  async removeProduct (customerId, productId){
    try {
      // Find the cart corresponding to the given customerId
      console.log(customerId, productId);
      const cart = await Cart.findOne({ customerId: customerId });
      if (!cart) {
         return this.error.Api_Error('Cart not found');
      }
      // Find the index of the item to remove
      const index = cart.items.findIndex(item => item.product._id === productId);
      console.log(index);

      if (index == -1) {
        return this.error.Api_Error('Item not found in cart');
      }

      // Remove the item from the items array
      cart.items.splice(index, 1);

      // Save the updated cart
      await cart.save();

      return cart.items;
    } catch (error) {
      return this.error.Api_Error('Remove Product Error:', error.message)
    }
  };


  async getAllCartItems(userId) {
    try {
      const items = await Cart.findOne({ customerId: userId });
      if (items) return items;
      return "Empty Cart!!";
    } catch (error) {
      return this.error.Api_Error('Remove Product Error:', error.message)
    }
  }

  async updateUnit(userId, productId, unit) {
    try {
      const items = await Cart.findOne({ customerId: userId });

      console.log(items);

      items?.items.map(pro => {
        if (pro.product._id == productId)
          pro.unit = unit;
      });
      await items.save();
      return "Updated Qty";
    } catch (error) {
      return this.error.Api_Error('Remove Product Error:', error.message);
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