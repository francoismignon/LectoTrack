const express = require('express');
const env = require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./src/routes/AuthRoutes.js');
const readingRoutes = require('./src/routes/ReadingRoutes.js');
const commentRoutes = require('./src/routes/CommentRoutes.js');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
app.use(cors());
const PORT = process.env.PORT;


//Routes Comments
app.use("/api/v1/comments", commentRoutes);
//Route Auth
app.use("/api/v1/auth", authRoutes);
//Route Readings
app.use("/api/v1/readings", readingRoutes);

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});