class CommentController{
    constructor(CommentService){
        this.commentService = CommentService;
    }

    update = async (req, res) => {
        try {
        const { id } = req.params;
        const message = "Ce commentaire à été supprimé car il ne respectait pas les règles de modérations";
        //dans cette routes, l'administrateur va supprimer le commentaire (modération)
        // on va néanmois garder l'entrée pour ne pas descendre la progression
        //simple commande sequelize
        await this.commentService.update({ id, message });

        res.status(200).json({ message: `le commentaire ${id} à bien été supprimer` });

    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
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