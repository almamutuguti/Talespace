/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js'

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((error, req, res) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});
    
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});