const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
  
    jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      req.userId = decoded.userId;
      next();
    });
    res.json({ message: 'Authorized' });
  }

  module.exports = {
    authenticateToken,
  }