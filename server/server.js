const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const ReadingRoutes = require('./src/routes/ReadingRoutes.js');
const { checkTokenJwt } = require('./src/middlewares/authMiddlewares.js');
const db = require('./src/models');
const CommentRepositrory = require('./src/Repositories/CommentRepository.js');
const CommentService =require('./src/Repositories/CommentRepository.js');
const ReadingRepository = require('./src/Repositories/ReadingRepository.js');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const commentRepository = new CommentRepositrory(db.Comment);
const commentService = new CommentService(commentRepository);
const readingRepository = new ReadingRepository(db.Reading);


app.patch("/api/v1/readings/:id", checkTokenJwt, async (req, res)=>{
    try {
        //le lecture rentre un numero de page et un commentaire
        const {nbrPages, pageNbr, content} = req.body;
        const {id:userId} = req.user;
        const {id:idReading} = req.params;

        //On calcule le pourcentage de progression
        const progress = Math.round((pageNbr/nbrPages) * 100); //suppression des chiffres apres la vigurle
        //On ajoute le commentaire et le numero de page dans la table Comments
        await commentService.create({
            readingId:idReading,
            pageNbr,
            content
        });
        //On met a jour le pourcentage de progression et si la progression est superieur a 0% ou atteind 100%, on met a jour le status dans la tables Readings
            //0%=> non commencé
            //>0% => en cours
            //1àà% => Terrminer
        if (progress === 100) {
            await readingRepository.update({
                progress,
                statusId: 3,
                idReading,
                userId
            });
        } else if (progress > 0) {
            await readingRepository.update({
                progress,
                statusId: 2,
                idReading,
                userId
            });
        }
        res.status(200).json({message:"le lecture a été mise a jour"});
        
    } catch (error) {
        res.status(error.statusCode || 500).json({error:error.message});
    }
});

//Route Auth
app.use("/api/v1/auth", authRoutes);
//Route Readings
app.use("/api/v1/readings", ReadingRoutes);

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});