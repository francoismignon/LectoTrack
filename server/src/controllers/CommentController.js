class CommentController{
    constructor(CommentService){
        this.commentService = CommentService;
    }

    getAll = async (req, res) => {
        try {
            //Simple requete sequelize pour lister tous les commentaires de tous les lecteurs
            const comments = await this.commentService.getAll();
            res.status(200).json(comments);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
}
module.exports = CommentController;