const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const ReadingRoutes = require('./src/routes/ReadingRoutes.js');
const { checkTokenJwt } = require('./src/middlewares/authMiddlewares.js');
const db = require('./src/models');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;


app.delete("/api/v1/readings/:id", checkTokenJwt, async (req, res) => {
    //on supprime si le lecteur est bien autenfither
    const { id: userId } = req.user;
    const { id: idReading } = req.params;

    try {
        //juste pour le fun, je voudrai d'abore avoir le titre du livre pour personnaliser le massage
        const {book:{title}} = await db.Reading.findOne({ //on destucture directement l'ojet sequelize dans la contante pour n'avoir que le titre
            where: {
                id: idReading,
                userId: userId
            },
            include: [
                {
                    model: db.Book,
                    as: 'book',
                    attributes: ['title']
                }
            ]
        });
        await db.Reading.destroy({
            where: {
                id: idReading,
                userId: userId
            }
        })
        res.status(200).json({ message: `${title} à bien ete supprimée avec succes` })

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