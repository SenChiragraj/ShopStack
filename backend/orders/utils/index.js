

export default class Utils {

  async getProductDetails(token, productId) {
    try {
      const response = await fetch(`http://localhost:8000/product/api/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json());
      return response || null;
    } catch (error) {
      throw new Error(error);
    }
  };

  async getCartDetails(token){
    try {
      const response = await fetch(`http://localhost:8000/order/api/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json());
      return response || null;

    } catch (error) {
      console.log(error);
    }
  }


}