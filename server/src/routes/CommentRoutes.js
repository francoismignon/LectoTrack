const express = require('express');
const checkTokenJwt = require('../middlewares/authMiddlewares.js');
const checkRole = require('../middlewares/userMiddleware.js');
const db = require('../models');
const CommentRepositrory = require('../Repositories/CommentRepository.js');
const CommentService = require('../services/CommentService.js');
const CommentController = require('../controllers/CommentController.js');

const router = express.Router();
const commentRepository = new CommentRepositrory(db.Comment);
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);


router.patch("/:id", checkTokenJwt, checkRole, commentController.update);
router.get("/", checkTokenJwt, checkRole, commentController.getAll);

module.exports = router;