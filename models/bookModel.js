import mongoose from "mongoose";

// Book Schema
export const bookSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Book = mongoose.model('Book', bookSchema);

export default Book