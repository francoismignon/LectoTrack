const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const ReadingRoutes = require('./src/routes/ReadingRoutes.js');
const { checkTokenJwt } = require('./src/middlewares/authMiddlewares.js');
const db = require('./src/models');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;


app.patch("/api/v1/readings/:id", checkTokenJwt, async (req, res)=>{
    try {
        //le lecture rentre un numero de page et un commentaire
        const {nbrPages, pageNbr, content} = req.body;
        const {id:userId} = req.user;
        const {id:idReading} = req.params;

        //On calcule le pourcentage de progression
        const progress = Math.round((pageNbr/nbrPages) * 100); //suppression des chiffres apres la vigurle
        //On ajoute le commentaire et le numero de page dans la table Comments
        await db.Comment.create({
            readingId:idReading,
            pageNbr, //version abregée car c'est le meme nom
            content
        },);
        //On met a jour le pourcentage de progression et si la progression est superieur a 0% ou atteind 100%, on met a jour le status dans la tables Readings
            //0%=> non commencé
            //>0% => en cours
            //1àà% => Terrminer
        if (progress === 100) {
            await db.Reading.update({
                progress: progress,
                statusId: 3
            },
                {
                    where: {
                        id: idReading,
                        userId
                    }
                });
        } else if (progress > 0) {
            await db.Reading.update({
                progress: progress,
                statusId: 2
            },
                {
                    where: {
                        id: idReading,
                        userId
                    }
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