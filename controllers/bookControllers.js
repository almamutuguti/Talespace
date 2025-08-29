import Book from '../models/bookModel';

// Get all books for a user
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error while fetching books' });
  }
};

// Create a new book
export const createBook = async (req, res) => {
  try {
    const { title, author, description, coverImage } = req.body;
    
    const book = new Book({
      title,
      author,
      description,
      coverImage,
      userId: req.user._id
    });
    
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Server error while creating book' });
  }
};

// Update a book
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, coverImage } = req.body;
    
    const book = await Book.findOne({ _id: id, userId: req.user._id });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    // Update book fields
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.coverImage = coverImage || book.coverImage;
    
    await book.save();
    res.json(book);
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ message: 'Server error while updating book' });
  }
};

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await Book.deleteOne({ _id: id, userId: req.user._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Server error while deleting book' });
  }
};

export default { getBooks, createBook, updateBook, deleteBook };