class ReadingController{
    constructor(readingService, authorService, categoryService, bookService, bookCategoryService){
        this.readingService = readingService;
        this.authorService = authorService;
        this.categoryService = categoryService;
        this.bookService = bookService;
        this.bookCategoryService = bookCategoryService;
    }

    getAllComments = async (req, res) => {
        try {
            //les information dont j'ai besoin : couvetur, titre, auteur, liste des commentaires pour cette lecture
            // sur cette vue j'ai juste besoin d'afficher la liste des commentaires de la lecture
            const { id: userId } = req.user;
            const { id: idReading } = req.params;

            const comments = await this.readingService.getAllCommentsByReadingId({
                idReading,
                userId
            });
            res.status(200).json(comments);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    update = async (req, res) => {
        try {
            //le lecture rentre un numero de page et un commentaire
            const { nbrPages, pageNbr, content } = req.body;
            const { id: userId } = req.user;
            const { id: idReading } = req.params;

            await this.readingService.update({
                nbrPages,
                pageNbr,
                userId,
                idReading,
                content
            });
            res.status(200).json({ message: "le lecture a été mise a jour" });

        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    delete = async (req, res) => {
        //on supprime si le lecteur est bien autenfither
        const { id: userId } = req.user;
        const { id: idReading } = req.params;

        try {
            //juste pour le fun, je voudrai d'abore avoir le titre du livre pour personnaliser le massage
            const { book: { title } } = await this.readingService.getReadingIncludeBook(idReading, userId); //on destucture directement l'ojet sequelize dans la contante pour n'avoir que le titre
            const isDelete = await this.readingService.delete(idReading, userId);
            // console.log(isDelete);
            (isDelete > 0) && res.status(200).json({ message: `${title} à bien été supprimée avec succes` }); // dans une ternaire, si il n'y a pas de faux, on px mettre directement && a la place de ?

        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
      //verifie si l'autheur est present en DB
        //si non => on le cree
        //si oui => on verifie si la les genre sont bien en DB
                        //si non, on les cree
                        // si oui => on verifie si le livre est presnet en DB
                                    //si non, on le cree
                                    //si oui => on verifie si les genre sont bien associer au livre
                                        // si non, on cree les association
                                        // si oui => on cree une nouvelle lecture
    createReading = async (req, res) => {
        const { title, authorName, coverUrl, nbrPages, categories } = req.body;
        const { id: userId } = req.user;

        try {
            //Verifie si l'auteur est présent en DB si pas on le cree
            const authorId = await this.authorService.getOrCreateAuthor(authorName);

            //On verifie la liste des categorie pour les enregister dans la DB
            const categoriesListIds = await this.categoryService.getOrCreateCategory(categories);

            //Creation d'un objet livre
            const bookId = await this.bookService.getOrCreateBook({
                authorId: authorId,
                title: title,
                nbrPages: nbrPages,
                coverUrl: coverUrl
            });

            //Mettre a jour la tables de jointure BookCategory on boucle les categories et on ajoute le meme livre pour chaque
            await this.bookCategoryService.getOrCreateBookCategory(bookId, categoriesListIds);

            // Vérifie si l'utilisateur a déjà une lecture de ce livre
            const existingReading = await this.readingService.getBookByIdAndUserId(bookId, userId);
            if (existingReading) {
                const err = new Error("Une lecture pour ce livre est déja en cours");
                err.statusCode = 409;
                throw err;
            }
            //on cree la nouvelle lecture
            const readingData = {
                bookId: bookId,
                userId: userId,
                progress: 0
                //le status par defaut (non commencé) est ajouter par migration
            }
            const reading = await this.readingService.create(readingData);
            res.status(201).json({ reading });
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    getReadings = async (req, res) => {
        try {
            const { id } = req.user; //Nom d'utilisateur connecté + id
            const { status, page, limit } = req.query; //pour les filtre et les tris et la magination

            //toutes les lecture en cours pour l'utilisateur connecter
            //pour chaque => image du livre, titre du livre, auteur du livres, pourcentage de progression et status de lecture

            //triée par genre
            //filtée par status

            //chercher en DB toutes les lecture de cet utilisateur
            const readings = await this.readingService.getAll(id, status, page, limit);
            res.status(200).json(readings);

        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    getReadingById = async (req, res) => {
        //une seule requete sequelize qui va chercher la lecture complete de l'utilisateur en utilisant le parametre id de le lecture passer dans l'url.
        // les tables a joindres sont Books, Authors
        //Les elements a afficher:
        // progression, titre, autheur, couverture du livre
        try {
            const { id: userId } = req.user;
            const { id: idReading } = req.params;

            const reading = await this.readingService.getById(idReading, userId);
            res.status(200).json(reading);

        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
}
module.exports = ReadingController;