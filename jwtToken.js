const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; // Replace with your actual secret key

const authenticateJWT = (req, resp, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return resp.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return resp.status(403).json({ message: 'Authentication failed: Invalid token' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
