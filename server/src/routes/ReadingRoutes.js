const express = require('express');
const db = require('../models');
const {checkTokenJwt} = require('../middlewares/authMiddlewares.js');
const AuthorRepository = require('../Repositories/AuthorRepository.js');
const CategoryRepository = require('../Repositories/CategoryRepository.js');
const BookRepository = require('../Repositories/BookRepository.js');
const BookCategoryRepository = require('../Repositories/BookCategoryRepository.js');
const ReadingRepository = require('../Repositories/ReadingRepository.js');
const AuthorService = require('../services/AuthorService.js');
const CategoryService = require('../services/CategoryService.js');
const BookService = require('../services/BookService.js');
const BookCategoryService = require('../services/BookCategoryService.js');
const ReadingService = require('../services/ReadingService.js');
const ReadingController = require('../controllers/ReadingController.js');


const router = express.Router();
const categoryRepository = new CategoryRepository(db.Category);
const authorRepository = new AuthorRepository(db.Author);
const bookRepository = new BookRepository(db.Book);
const readingRepository = new ReadingRepository(
    db.Reading,
    db.Book,
    db.Author,
    db.Status
);
const bookCategoryRepository = new BookCategoryRepository(db.BookCategory);
const authorService = new AuthorService(authorRepository);
const categoryService = new CategoryService(categoryRepository);
const bookService = new BookService(bookRepository);
const bookCategoryService = new BookCategoryService(bookCategoryRepository);
const readingService = new ReadingService(readingRepository);
const readingController = new ReadingController(
    readingService,
    authorService,
    categoryService,
    bookService,
    bookCategoryService
);

router.get("/:id", checkTokenJwt, readingController.getReadingById);
router.post("/", checkTokenJwt, readingController.createReading);
router.get("/", checkTokenJwt, readingController.getReadings);

module.exports = router;