import axios from 'axios';

// List all books
export const listBooks = async (req, res) => {
  const sort = req.query.sort || 'date_read';
  const search = req.query.search || '';
  try {
    const result = await req.db.query(
      `SELECT * FROM books WHERE LOWER(title) LIKE $1 ORDER BY ${sort} DESC`,
      [`%${search.toLowerCase()}%`]
    );
    res.render('index', { books: result.rows, search });
  } catch (err) {
    console.error(err);
    res.send('Database error');
  }
};

// Show form to add new book
export const showNewForm = (req, res) => {
  res.render('book-details', { book: null });
};

// Create a new book
export const createBook = async (req, res) => {
  const { title, author, rating, notes, date_read } = req.body;
  const cover_url = `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-L.jpg`;
  try {
    await req.db.query(
      'INSERT INTO books (title, author, cover_url, rating, notes, date_read) VALUES ($1, $2, $3, $4, $5, $6)',
      [title, author, cover_url, rating, notes, date_read]
    );
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.send('Failed to insert book');
  }
};

// View a single book (optional detail page)
export const viewBook = async (req, res) => {
  try {
    const result = await req.db.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
    res.render('book-details', { book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.send('Book not found');
  }
};

// Show form to edit book
export const showEditForm = async (req, res) => {
  try {
    const result = await req.db.query('SELECT * FROM books WHERE id = $1', [req.params.id]);
    res.render('book-details', { book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.send('Book not found');
  }
};

// Update book
export const updateBook = async (req, res) => {
  const { title, author, rating, notes, date_read } = req.body;
  const cover_url = `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-L.jpg`;
  try {
    await req.db.query(
      'UPDATE books SET title=$1, author=$2, cover_url=$3, rating=$4, notes=$5, date_read=$6 WHERE id=$7',
      [title, author, cover_url, rating, notes, date_read, req.params.id]
    );
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.send('Failed to update book');
  }
};

// Delete book
export const deleteBook = async (req, res) => {
  try {
    await req.db.query('DELETE FROM books WHERE id = $1', [req.params.id]);
    res.redirect('/books');
  } catch (err) {
    console.error(err);
    res.send('Failed to delete book');
  }
};
