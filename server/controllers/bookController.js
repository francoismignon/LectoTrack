const db = require('../models');

const getAllBooks = async (req, res) => {
  try {
    const books = await db.Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await db.Book.findByPk(id, {
      include: [
        {
          model: db.BookAuthor,
          include: [db.Author]
        },
        db.Note,
        db.Reading
      ]
    });
    
    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, isbn, cover_url, user_id } = req.body;
    
    const book = await db.Book.create({
      title,
      isbn,
      cover_url,
      user_id
    });
    
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isbn, cover_url } = req.body;
    
    const book = await db.Book.findByPk(id);
    
    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    
    await book.update({
      title: title || book.title,
      isbn: isbn || book.isbn,
      cover_url: cover_url || book.cover_url
    });
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await db.Book.findByPk(id);
    
    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }
    
    await book.destroy();
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook 
};