const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const ReadingRoutes = require('./src/routes/ReadingRoutes.js');
const { checkTokenJwt } = require('./src/middlewares/authMiddlewares.js');
const db = require('./src/models');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;




app.get("/api/v1/readings", checkTokenJwt, async (req, res) => {
    try {
        const { id } = req.user; //Nom d'utilisateur connecté + id
        const {status, genre} = req.query; //pour les filtre et les tris

        //toutes les lecture en cours pour l'utilisateur connecter
        //pour chaque => image du livre, titre du livre, auteur du livres, pourcentage de progression et status de lecture

        //triée par genre
        //filtée par status

        //chercher en DB toutes les lecture de cet utilisateur
        const readings = await db.Reading.findAll({
            where: {
                userId: id
            },
            attributes: ['progress'],
            include: [
                {
                    model: db.Book,
                    as:'book',
                    attributes: ['title', 'coverUrl'],
                    include: [
                        {
                            model: db.Author,
                            as:'author',
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: db.Status,
                    as:'status',
                    attributes: ['name'],
                    where: status?{
                        name:status //on trie les lecture par status
                    }:undefined //si il n'y a pas de parametre(donc si on vx tout)
                }
            ]
        });
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