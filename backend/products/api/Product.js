// import isAuthenticated from "../middleware/isAuthenticated.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import ProductService from "../services/ProductServices.js";

export default function ProductGateway(app) {

  const service = new ProductService();

  app.post('/api/add',isAuthenticated, async (req, res, next) => {
    try {
      console.log(req.body);
      // const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = req.body;
      // if (!title || !description || !price || !discountPercentage || !rating || !stock || !brand || !category || !thumbnail || !images) return res.json(null);
      const data = await service.addProduct(req.body);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/all', async (req, res, next) => {
    try {
      const data = await service.getAll();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/user',isAuthenticated, async (req, res, next) => {
    try {
      return res.json(req.user);
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/:id', async (req, res) => {
    const {id} = req.params;
    try {
      const product = await service.findProduct(id);
      res.status(201).json({ product: product })
    } catch (error) {
      next(error);
    }
  });
}

// route.get('/all', getAll);
// route.post('/login', loginUser);
// route.post('/register', registerUser);