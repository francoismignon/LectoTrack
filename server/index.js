const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes.js');
// const userRoutes = require('./routes/userRoutes.js');
// const authRoutes = require('./routes/authRoutes.js');
// const authorRoutes = require('./routes/authorRoutes.js');
// const bookauthorRoutes = require('./routes/bookauthorRoutes.js');
// const noteRouters = require('./routes/noteRouters.js');
// const readingRouters = require('./routes/readingRouters.js');

env.config();
const app = express();
const PORT = process.env.PORT;
// const saltRounds = 10 //nombre de salage de mdp

//middleware
app.use(express.json());//pour lire le requ.body en JSON
app.use(cors());

// Utilisateurs
// app.use('/api/users', userRoutes);
// Authentification
// app.use('/api/auth', authRoutes);
// Livres
app.use('/api/books', bookRoutes);
// Auteurs
// app.use('/api/authors', authorRoutes)
// Relations Livre-Auteur
// app.use('/api/bookauthors', bookauthorRoutes);
// Notes
// app.use('/api/notes', noteRouters);
// Lectures
// app.use('/api/readings', readingRouters);


app.listen(PORT, ()=>{
    console.log(`Le serveur à démarrer sur : http://localhost:${PORT}`);
});