const express = require('express');
const env = require('dotenv');
const db = require('./src/models');


env.config();
const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;


//Routes
app.post("/api/v1/auth/register", async (req, res)=>{
    try {
        //Verifier si l'utilisateur existe deja
        const {login, password} = req.body;
        const existingUser = await db.User.findOne({
            where:{
                login:login
            }
        });
        if (existingUser === login) {
            console.log("L'utilisateur existe deja");
        } else {
            console.log(`login: ${login} password:${password}`);
        }
        //Verifier si le mot de passe correspont a la verification
        //Hachage
        //attribuer un role
        //enregister le nouvel utilisateur
    } catch (error) {
        console.log(error.message);
    } 
});

app.listen(PORT, ()=>{
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});