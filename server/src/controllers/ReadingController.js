class ReadingController{
    constructor(readingService, authorService, categoryService, bookService, bookCategoryService){
        this.readingService = readingService;
        this.authorService = authorService;
        this.categoryService = categoryService;
        this.bookService = bookService;
        this.bookCategoryService = bookCategoryService;
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
            const { status } = req.query; //pour les filtre et les tris

            //toutes les lecture en cours pour l'utilisateur connecter
            //pour chaque => image du livre, titre du livre, auteur du livres, pourcentage de progression et status de lecture

            //triée par genre
            //filtée par status

            //chercher en DB toutes les lecture de cet utilisateur
            const readings = await this.readingService.getAll(id, status);
            res.status(200).json(readings);

        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    getReadingById = async (req, res) => {
        //une seule requete sequelize qui va chercher la lecture complete de l'utilisateur en utilisant le parametre id du livre passer dans l'url.
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