const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const ReadingRoutes = require('./src/routes/ReadingRoutes.js');
const { checkTokenJwt } = require('./src/middlewares/authMiddlewares.js');
const db = require('./src/models');
const ReadingRepository = require('./src/Repositories/ReadingRepository.js');
const ReadingService = require('./src/services/ReadingService.js');
const CommentRepositrory = require('./src/Repositories/CommentRepository.js');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const readingRepository = new ReadingRepository(
    db.Reading,
    db.Book,
    db.Author,
    db.Status,
    db.Comment
);
const readingService = new ReadingService(readingRepository);


app.get("/api/v1/readings/:id/comments", checkTokenJwt, async (req, res) => {
    try {
        //les information dont j'ai besoin : couvetur, titre, auteur, liste des commentaires pour cette lecture
        // sur cette vue j'ai juste besoin d'afficher la liste des commentaires de la lecture
        const { id: userId } = req.user;
        const { id: idReading } = req.params;

        const comments = await readingService.getAllCommentsByReadingId({
            idReading,
            userId
        });
        res.status(200).json(comments);
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