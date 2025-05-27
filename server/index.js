import express from "express";
import env from "dotenv";
// import bcrypt from "bcrypt";
import cors from 'cors';

env.config();
const app = express();
const PORT = process.env.PORT;
// const saltRounds = 10 //nombre de salage de mdp

//middleware
app.use(express.json());//pour lire le requ.body en JSON
app.use(cors());

app.get("/api/books", (req, res)=>{
    res.json({ message: 'Hello depuis Backend !' })
});

app.post("/api/register", (req, res)=>{
    console.log(req.body);
});

app.listen(PORT, ()=>{
    console.log(`Le serveur à démarrer sur : http://localhost:${PORT}`);
});