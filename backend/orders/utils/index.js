

export default class Utils {

  async getProductDetails(token, productId) {
    console.log(productId);
    try {
      const response = await fetch(`http://products:8002/api/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => res.json());
      console.log(response.product);
      return response.product || null;
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