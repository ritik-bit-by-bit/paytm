const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
 
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: "Authorization header missing or invalid format" });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({ message: "Invalid token: userId missing" });
    }
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", error: err.message });
  }
}

module.exports = authMiddleware;

