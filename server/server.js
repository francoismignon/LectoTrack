const express = require('express');
const env = require('dotenv');
const authRoutes = require('./src/routes/AuthRoutes.js');
const db = require('./src/models');
const bcrypt = require('bcrypt');
const UserRepository = require('./src/Repositories/UserRepository.js');
const AuthService = require('./src/services/AuthService.js');
const AuthController = require('./src/controllers/AuthController.js');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');




env.config();
const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const saltRound = 10;
const userRepository = new UserRepository(db.User);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

//middleware
function checkToken(req, res, next) {
    try {
        //on verifie si le token de l'utilisateur present
        const authHeader = req.headers.authorization;
        //si non => message d'erreur 
        if (!authHeader) {
            const err = new Error("Token manquant");
            err.statusCode = 401;
            throw err;
        }
        //on verifie si le token de l'utilisateur valide
        const token = authHeader.split(' ')[1]//on decoupe la chaine en deux en utilisant l'espace comme "pivot", on selectionne l'index 1 du tableau

        //on decode le token avec la methode verify de jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            const err = new Error("token invalide");
            err.statusCode = 403;
            throw err;
        }
        //on injecte le token valide dans la requete
        req.user = decoded;
        next();//middleware suivant ou bien route

    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

app.post("/api/v1/readings", checkToken, async (req, res) => {
    const { title, authorName, coverUrl, nbrPages } = req.body;
    const {id:userId} = req.user;

    //verifie si l'autheur est present en DB
        //si non => on le cree
        //si oui => on verifie si le livre est presnet en DB
                //si non, on le cree
                //si oui => on cree une nouvelle lecture

    try {
        //Verifie si l'auteur est présent en DB
        const [author] = await db.Author.findOrCreate({
            where:{name:authorName}, //critere de recherche
            defaults:{name:authorName} //valeur ajoutée si pas trouvé
        });

        const {id: authorId} = author //on extrait l'id de l'autheur pour l'ajouter au livre

        const [book] = await db.Book.findOrCreate({
            where:{ 
                title:title,
                authorId:authorId
             },
            defaults:{
                authorId: authorId,
                nbrPages: nbrPages,
                coverUrl:coverUrl,
                title:title
            }
        });

        const {id: bookId} = book;
        
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
        //on cree la nouvelle lecture
        const readings = await db.Reading.create({
            bookId:bookId,
            userId:userId,
            progress:0
            // le status par defaut (non commencé) est ajouter par migration
        });
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