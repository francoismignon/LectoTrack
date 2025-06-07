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



app.get("/api/v1/readings/:id", checkTokenJwt, async (req, res) => {
    //une seule requete sequelize qui va chercher la lecture complete de l'utilisateur en utilisant le parametre id du livre passer dans l'url.
    // les tables a joindres sont Books, Authors
    //Les elements a afficher:
    // progression, titre, autheur, couverture du livre
    try {
        const { id: userId } = req.user;
        const { id: idReading } = req.params;

        const reading = await readingService.getById(idReading, userId);
        res.status(200).json(reading);

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