const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const ReadingRoutes = require('./src/routes/ReadingRoutes.js');
const { checkTokenJwt } = require('./src/middlewares/authMiddlewares.js');
const db = require('./src/models');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;

checkRole = async (req, res, next) =>{
    try {
        const { id: userId } = req.user;
        //Vu qu'il s'agit de lister tous les commentaires, pour pouvoir les modéré par l'admin, on dois verifier le Role de l'utilisateur incrit.

        //verification du roles, on va chercher le role associer a l'utilisateur connecté
        const {role:{name}} = await db.User.findOne({
            where: {
                id: userId
            },
            attributes:['login'],
            include: [
                {
                    model: db.Role,
                    as: 'role',
                    attributes: ['name']
                }
            ]
        });
        if (!name) {
            const err = new Error("L'utilisateur n'as pas été trouvé");
            err.statusCode = 404;
            throw err;
        }
        //Si le role est lecteur, l'utilisateur ne px pas acceder a cette route
        if (name === 'Lecteur') {
            const err = new Error(`${name} n'as pas le droit d'acceder à cette page`);
            err.statusCode = 403;
            throw err;
        }
        req.role = name;
        next();
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}


app.get("/api/v1/comments", checkTokenJwt,checkRole, async (req, res) => {
    try {
        //Simple requete sequelize pour lister tous les commentaires de tous les lecteurs
        const comments = await db.Comment.findAll({
            attributes:['content']
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