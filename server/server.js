const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const ReadingRoutes = require('./src/routes/ReadingRoutes.js');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;


app.use("/api/v1/readings", ReadingRoutes);

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