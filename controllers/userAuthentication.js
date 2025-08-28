/* eslint-disable no-undef */



import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/userModel';

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
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
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
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

export default { register, login };