const express = require('express');
const env = require('dotenv');
const authRoutes = require('./src/routes/AuthRoutes.js');
const db = require('./src/models');
const bcrypt = require('bcrypt');



env.config();
const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const saltRound = 10;

//Routes
app.use("/api/v1/auth", authRoutes);

app.post("/api/v1/auth/login", async (req, res) => {
    const { login, password } = req.body;
    try {
        //normalisation du login (BL) => deja coder
        const loginFormatted = login.slice(0, 1).toUpperCase() + login.slice(1).toLowerCase();
        //Verifier si le login existe (BL) => deja coder
        const existingUser = await db.User.findOne({ where: { login: loginFormatted } });
        if (!existingUser){
            return res.status(404).json({message:"L'utilisateur n'existe pas"});
        }
        //verifier si le mdp coeerespond au mdp en db (BL)
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({message:"Mot de passe incorrecte"});
        }
        //transmettre le jetton jwt
        res.status(200).json(existingUser);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});