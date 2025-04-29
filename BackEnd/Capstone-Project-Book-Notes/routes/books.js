import express from "express";
import * as booksController from "../controllers/booksController.js";

const router = express.Router();

// All Books
router.get('/', booksController.listBooks);

// New Book Form
router.get('/new', booksController.showNewForm);

// Create Book
router.post('/', booksController.createBook);

// Book Details
router.get('/:id', booksController.viewBook);

// Edit Form
router.get('/:id/edit', booksController.showEditForm);

// Update Book
router.put('/:id', booksController.updateBook);

// Delete Book
router.delete('/:id', booksController.deleteBook);

export default router;
