/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import User from '../models/User';

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }
    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

export default authenticateToken ;