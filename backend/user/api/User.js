import isAuthenticated from "../middleware/isAuthenticated.js";
import UserService from "../services/UserServices.js";

export default function UserGateway(app) {

  const service = new UserService();

  app.post('/api/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
       if (!email || !password) return res.json(null);
      const data = await service.Login({ email, password });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/register', async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) return res.json(null);
      const data = await service.Register({ email, password, name });
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

  app.get('/api/curr', isAuthenticated, async (req, res) => {
    return res.json({ user: req.user });
  });

  app.get('/', async (req, res) => {
    return res.json({ message: 'User is running ' });
  });
}

// route.get('/all', getAll);
// route.post('/login', loginUser);
// route.post('/register', registerUser);