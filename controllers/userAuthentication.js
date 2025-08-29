/* eslint-disable no-undef */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/userModel';

export const setToken = (res, token) => {
  res.setHeader('Authorization', `Bearer ${token}`);
  return token;
};

// Register a new user
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Additional validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    
    // Check if user already exists by both email and username
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'User already exists with this email' });
      } else {
        return res.status(400).json({ message: 'Username is already taken' });
      }
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    // Generate token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      accessToken,
      user: { 
        id: user._id, 
        email: user.email, 
        username: user.username 
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      accessToken,
      user: { 
        id: user._id, 
        email: user.email, 
        username: user.username 
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export default { register, login }