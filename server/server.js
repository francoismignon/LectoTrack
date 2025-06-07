const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const ReadingRoutes = require('./src/routes/ReadingRoutes.js');
const { checkTokenJwt } = require('./src/middlewares/authMiddlewares.js');
const db = require('./src/models');
const ReadingRepository = require('./src/Repositories/ReadingRepository.js');
const ReadingService = require('./src/services/ReadingService.js');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const readingRepository = new ReadingRepository(
    db.Reading, 
    db.Book,
    db.Author,
    db.Status
);
const readingService = new ReadingService(readingRepository);




app.get("/api/v1/readings", checkTokenJwt, async (req, res) => {
    try {
        const { id } = req.user; //Nom d'utilisateur connecté + id
        const {status} = req.query; //pour les filtre et les tris

        //toutes les lecture en cours pour l'utilisateur connecter
        //pour chaque => image du livre, titre du livre, auteur du livres, pourcentage de progression et status de lecture

        //triée par genre
        //filtée par status

        //chercher en DB toutes les lecture de cet utilisateur
        const readings = await readingService.getAll(id, status);
        res.status(200).json(readings);

    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

//Route Auth
app.use("/api/v1/auth", authRoutes);
//Route Readings
app.use("/api/v1/readings", ReadingRoutes);

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});