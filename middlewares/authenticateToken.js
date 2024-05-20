const jwt = require('jsonwebtoken');
require("dotenv").config()

const secretKey = process.env.JWT_SECRET

function authenticateToken(req, res, next) {
  let token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Authentication failed' });
  token = token && token.split(' ')[1]

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token is not valid' });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;