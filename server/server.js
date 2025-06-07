const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const ReadingRoutes = require('./src/routes/ReadingRoutes.js');
const { checkTokenJwt } = require('./src/middlewares/authMiddlewares.js');
const db = require('./src/models');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;


app.post("/api/v1/reading/:id", checkTokenJwt, async (req, res)=>{
    //le lecture rentre un numero de page et un commentaire
});

//Route Auth
app.use("/api/v1/auth", authRoutes);
//Route Readings
app.use("/api/v1/readings", ReadingRoutes);

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});