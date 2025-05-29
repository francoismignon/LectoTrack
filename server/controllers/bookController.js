const axios = require ("axios");
const db = require('../models');

const getAllBooks = async (req, res) => {
  try {
    const books = await db.Book.findAll({
      include:db.Author
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  const {title, author} = req.body;
  const API_URL = "https://openlibrary.org/search.json";
  var bookCoverURL = "";

  try {
    const bookURL = await axios.get(`${API_URL}`, {
      params:{
        title:title
      }
    });
    bookURL.data.docs.forEach(element => {
      console.log(element);
    });
    
    const doc = bookURL.data.docs.find(doc => doc.cover_edition_key);
    const olid = doc.cover_edition_key;
    //reconstitution de l'URL
    bookCoverURL = `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`;

  } catch (error) {
      console.error("Erreur OpenLibrary :", error.message);
  }

  try {
    const newBook= await db.Book.create({
      title: title,
      cover_url: bookCoverURL
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Erreur Sequelize :", error.message);
  }
}

module.exports = { 
  getAllBooks,
  createBook
};