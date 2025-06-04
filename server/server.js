const express = require('express');
const env = require('dotenv');
const authRoutes = require('./src/routes/AuthRoutes.js');



env.config();
const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;



//Routes
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, ()=>{
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});