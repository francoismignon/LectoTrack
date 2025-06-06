const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const db = require('./src/models');
const bcrypt = require('bcrypt');
const UserRepository = require('./src/Repositories/UserRepository.js');
const AuthService = require('./src/services/AuthService.js');
const AuthController = require('./src/controllers/AuthController.js');
const {checkTokenJwt} = require('./src/middlewares/authMiddlewares.js');
const AuthorRepository = require('./src/Repositories/AuthorRepository.js');
const CategoryRepository = require('./src/Repositories/CategoryRepository.js');
const BookRepository = require('./src/Repositories/BookRepository.js');
const BookCategoryRepository = require('./src/Repositories/BookCategoryRepository.js');
const ReadingRepository = require('./src/Repositories/ReadingRepository.js');
const AuthorService = require('./src/services/AuthorService.js');
const CategoryService = require('./src/services/CategoryService.js');
const BookService = require('./src/services/BookService.js');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const saltRound = 10;
const userRepository = new UserRepository(db.User);
const categoryRepository = new CategoryRepository(db.Category);
const authorRepository = new AuthorRepository(db.Author);
const bookRepository = new BookRepository(db.Book);
const readingRepository = new ReadingRepository(db.Reading);
const bookCategoryRepository = new BookCategoryRepository(db.BookCategory);
const authService = new AuthService(userRepository);
const authorService = new AuthorService(authorRepository);
const categoryService = new CategoryService(categoryRepository);
const bookService = new BookService(bookRepository);
const authController = new AuthController(authService);


app.post("/api/v1/readings", checkTokenJwt, async (req, res) => {
    //verifie si l'autheur est present en DB
        //si non => on le cree
        //si oui => on verifie si la les genre sont bien en DB
                        //si non, on les cree
                        // si oui => on verifie si le livre est presnet en DB
                                    //si non, on le cree
                                    //si oui => on verifie si les genre sont bien associer au livre
                                        // si non, on cree les association
                                        // si oui => on cree une nouvelle lecture

    const { title, authorName, coverUrl, nbrPages, categories } = req.body;
    const {id:userId} = req.user;

    try {
        //Verifie si l'auteur est présent en DB si pas on le cree
        const authorId = await authorService.getOrCreateAuthor(authorName);

        //On verifie la liste des categorie pour les enregister dans la DB
        const categoriesListIds = await categoryService.getOrCreateCategory(categories);

       //Creation d'un objet livre
        const bookId = await bookService.getOrCreateBook({
            authorId: authorId,
            title: title,
            nbrPages: nbrPages,
            coverUrl: coverUrl
        });

       //Mettre a jour la tables de jointure BookCategory on boucle les categories et on ajoute le meme livre pour chaque
       const bookCategory = [];
       for(let i = 0; i < categoriesListIds.length; i++){
        const BookCategoryData = {
            bookId:bookId,
            categoryId:categoriesListIds[i]
        };
        const [listBookIdCatId] = await bookCategoryRepository.getOrCreateBookCategory(BookCategoryData);
        bookCategory.push(listBookIdCatId);
       }
        
        // Vérifie si l'utilisateur a déjà une lecture de ce livre
        const existingReading = await db.Reading.findOne({
            where:{
                bookId:bookId,
                userId:userId
            }
        });
        if(existingReading){
            const err = new Error("Une lecture pour ce livre est déja en cours");
            err.statusCode = 409;
            throw err;
        }
        //creation objet Lecture
        const readingData = {
            bookId:bookId,
            userId:userId,
            progress:0
            // le status par defaut (non commencé) est ajouter par migration
        }
        //on cree la nouvelle lecture
        const readings = readingRepository.create(readingData);
        res.status(201).json({message : "La lecture à bien débuté"});
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

// app.get("/api/v1/readings", checkToken, async (req, res) => {
//     const { id, login } = req.user; //Nom d'utilisateur connecté + id

//     //toutes les lecture en cours pour l'utilisateur connecter
//     //pour chaque => image du livre, titre du livre, auteur du livres, pourcentage de progression et status de lecture

//     //chercher en DB toutes les lecture de cet utilisateur
//     const readings = await db.Reading.findAll({
//         where: {
//             userId: id
//         },
//         attributes: ['progress'], // ← lecture
//         include: [
//             {
//                 model: Book,
//                 attributes: ['title', 'coverUrl'],
//                 include: [
//                     {
//                         model: Author,
//                         attributes: [['name', 'autor']] // alias
//                     }
//                 ]
//             },
//             {
//                 model: Status,
//                 attributes: [['name', 'status']] // alias
//             }
//         ]
//     });
// });

//Routes Auth
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});