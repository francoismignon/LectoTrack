const express = require('express');
const env = require('dotenv').config();
const authRoutes = require('./src/routes/AuthRoutes.js');
const ReadingRoutes = require('./src/routes/ReadingRoutes.js');
const checkTokenJwt = require('./src/middlewares/authMiddlewares.js');
const checkRole = require('./src/middlewares/userMiddleware.js');
const db = require('./src/models');
const UserRepository = require('./src/Repositories/UserRepository.js');
const CommentRepositrory = require('./src/Repositories/CommentRepository.js');
const UserService = require('./src/services/UserService.js');
const CommentService = require('./src/services/CommentService.js');
const CommentController = require('./src/controllers/CommentController.js');


const app = express();
app.use(express.json());//pour lire le requ.body en JSON
const PORT = process.env.PORT;
const userRepository = new UserRepository(
    db.User,
    db.Role
);
const commentRepository = new CommentRepositrory(db.Comment);
const userService = new UserService(userRepository);
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);


app.get("/api/v1/comments", checkTokenJwt,checkRole, async (req, res) => {
    commentController.getAll(req, res);
});

//Route Auth
app.use("/api/v1/auth", authRoutes);
//Route Readings
app.use("/api/v1/readings", ReadingRoutes);

app.listen(PORT, () => {
    console.log(`Le serveur a démarrer sur : http://localhost:${PORT}`);
});