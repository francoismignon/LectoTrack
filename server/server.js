const express = require('express');
const env = require('dotenv');
const db = require('./src/models');
const bcrypt = require('bcrypt');
const UserRepository = require('./src/Repositories/UserRepository');


env.config();
const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const saltRound = 10; //nbr de salage
const userRepository = new UserRepository(db.User);


//Routes
app.post("/api/v1/auth/register", async (req, res)=>{
    const {login, password, confirmPassword} = req.body;
    //formater correctement l'entrée (BL)
    const loginFormatted = login.slice(0,1).toUpperCase() + login.slice(1).toLowerCase();
    
    try {
  
        const existingUser = await userRepository.findByLogin(loginFormatted);
        
        if(existingUser){
            return res.status(400).json({ message: "L'utilisateur existe déja" });
        }

        //Verifier si le mot de passe correspont a la verification(BL)
        if(password !== confirmPassword){
            return res.status(400).json({message:"Les mot de passe ne correpondent pas"});
        }
        //Hachage (BL)
        const hashPassword = await bcrypt.hash(password, saltRound);
    
        const newUser = await userRepository.create({
            login: loginFormatted,
            password: hashPassword
        });

        res.status(201).json({ 
            user: {
                id:newUser.id,
                login:newUser.login,
                roleId:newUser.roleId
        }});

    } catch (error) {
        console.log(error.message);
    } 
});

app.listen(PORT, ()=>{
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});