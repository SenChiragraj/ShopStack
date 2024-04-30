// import isAuthenticated from "../middleware/isAuthenticated.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import CartService from "../services/CartServices.js";
import Utils from "../utils/index.js";

export default function CartGateway(app) {

  const service = new CartService();
  const utils = new Utils();

  app.get('/api/all', isAuthenticated, async (req, res, next) => {
    try {
      const data = await service.getAll(req.user._id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/addProduct/:id',isAuthenticated,  async (req, res, next) => {
    try {
      const { id } = req.params;
      let data;
      const product = await utils.getProductDetails(req.token, id);
      if (product) {
        data = await service.addProduct(req.user._id, product);
      }
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/removeProduct/:productId', isAuthenticated, async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await service.removeProduct(req.user._id, productId);
      res.status(201).json({ product: product })
    } catch (error) {
      next(error);
    }
    return res.json({ user: req.user });
  });

  app.post('/api/update/qty/:productId', isAuthenticated, async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { unit } = req.body;
      const data = await service.manageProduct(req.user._id, productId, unit);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
}

// route.get('/all', getAll);
// route.post('/login', loginUser);
// route.post('/register', registerUser);