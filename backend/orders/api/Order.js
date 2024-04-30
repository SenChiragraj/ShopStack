import isAuthenticated from "../middleware/isAuthenticated.js";
import OrderService from "../services/OrderServices.js";
import Utils from "../utils/index.js";


export default function OrderGateway(app) {

  const service = new OrderService();
  const utils = new Utils();

  app.get('/all', isAuthenticated, async (req, res) => {
    try {
      const orders = await service.getAllOrder(req.user._id);
      return res.json(orders);
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  });

  app.post('/place', isAuthenticated, async (req, res) => {
    try {
      const cart = await utils.getCartDetails(req.token);
      if (cart) {
        const orders = await service.placeOrder(cart);
        return res.status(201).json(orders);
      }
      return res.status(400).json({ message: "Cart Empty" });
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  });

  app.delete('/return/:orderId', isAuthenticated, async (req, res) => {
    try {
      const { orderId } = req.params;
      const orders = await service.returnOrder(orderId);
      // return orders || 'You dont have any orders';
      return res.status(200).json({ orders});
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  });

  // app.put('/update/:orderId', isAuthenticated, async (req, res) => {
  //   try {
  //     // const
  //   } catch (error) {
  //     return res.status(404).json({ message: error.message })
  //   }
  // });


};