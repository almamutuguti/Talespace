import express from 'express'
import { 
  getBooks, 
  createBook, 
  updateBook, 
  deleteBook 
} from '../controllers/bookControllers.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/', getBooks);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;