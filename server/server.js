const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const readingRoutes = require('./src/routes/ReadingRoutes.js');
const commentRoutes = require('./src/routes/CommentRoutes.js');
const checkTokenJwt = require('./src/middlewares/authMiddlewares.js');
const checkRole = require('./src/middlewares/userMiddleware.js');
const db = require('./src/models');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;


app.patch("/api/v1/comments/:id", checkTokenJwt, checkRole, async (req, res) => {
    try {
        const { id } = req.params;
        const message = "Ce commentaire à été supprimé car il ne respectait pas les règles de modérations";
        //dans cette routes, l'administrateur va supprimer le commentaire (modération)
        // on va néanmois garder l'entrée pour ne pas descendre la progression
        //simple commande sequelize
        await db.Comment.update({
            content: message
        }, {
            where: {
                id
            },
        }
        );

        res.status(200).json({ message: `le commentaire ${id} à bien été supprimer` });

    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

//Routes Comments
app.use("/api/v1/comments", commentRoutes);
//Route Auth
app.use("/api/v1/auth", authRoutes);
//Route Readings
app.use("/api/v1/readings", readingRoutes);

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});