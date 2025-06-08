const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const ReadingRoutes = require('./src/routes/ReadingRoutes.js');
const { checkTokenJwt } = require('./src/middlewares/authMiddlewares.js');
const db = require('./src/models');
const ReadingRepository = require('./src/Repositories/ReadingRepository.js');
const ReadingService = require('./src/services/ReadingService.js');
const CommentRepository= require('./src/Repositories/CommentRepository.js');
const ReadingController = require('./src/controllers/ReadingController.js');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const readingRepository = new ReadingRepository(db.Reading);
const commentRepository = new CommentRepository(db.Comment);
const readingService = new ReadingService(
    readingRepository,
    commentRepository
);
const readingController = new ReadingController(readingService);


app.patch("/api/v1/readings/:id", checkTokenJwt, async (req, res)=>{
    readingController.update(req, res);
});

//Route Auth
app.use("/api/v1/auth", authRoutes);
//Route Readings
app.use("/api/v1/readings", ReadingRoutes);

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});