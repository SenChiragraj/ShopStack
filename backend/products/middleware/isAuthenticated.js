import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log();
      //
      if (decoded) {
        // Fetch user data
        const response = await fetch(`http://user:8001/api/curr`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const result = await response.json();
        if (result) {
          // Attach user data to request object
          req.user = result.user;
          req.token = token;
          next();
        } else {
          throw new Error('User not found');
        }
      } else {
        throw new Error('Token verification failed');
      }
    } else {
      throw new Error('Authorization header missing or invalid');
    }
  } catch (error) {
    // Handle errors
    res.status(401).json({ message: 'Not authorized', error: error.message });
  }
};

export default isAuthenticated;
