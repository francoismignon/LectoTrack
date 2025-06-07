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
    db.Book
);
const readingService = new ReadingService(readingRepository);


app.delete("/api/v1/readings/:id", checkTokenJwt, async (req, res) => {
    //on supprime si le lecteur est bien autenfither
    const { id: userId } = req.user;
    const { id: idReading } = req.params;

    try {
        //juste pour le fun, je voudrai d'abore avoir le titre du livre pour personnaliser le massage
        const {book:{title}} = await readingService.getReadingIncludeBook(idReading, userId); //on destucture directement l'ojet sequelize dans la contante pour n'avoir que le titre
        const isDelete = await readingService.delete(idReading, userId);
        // console.log(isDelete);
        (isDelete>0) && res.status(200).json({ message: `${title} à bien été supprimée avec succes` }); // dans une ternaire, si il n'y a pas de faux, on px mettre directement && a la place de ?

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