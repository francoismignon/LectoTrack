class ReadingRepository {
    constructor(ReadingModel, BookModel, AuthorModel, StatusModel) {
        this.Reading = ReadingModel;
        this.Book = BookModel;
        this.Author = AuthorModel;
        this.Status = StatusModel;
    }

    async detele(idReading, userId){
        return await this.Reading.destroy({
            where: {
                id: idReading,
                userId: userId
            }
        })
    }

    async getReadingIncludeBook(idReading, userId) {
        return await this.Reading.findOne({ 
            where: {
                id: idReading,
                userId: userId
            },
            include: [
                {
                    model: this.Book,
                    as: 'book',
                    attributes: ['title']
                }
            ]
        });
    }

    async create(reading) {
        return await this.Reading.create(reading);
    }

    async getBookByIdAndUserId(bookId, userId) {
        return await this.Reading.findOne({
            where: {
                bookId: bookId,
                userId: userId
            }
        });
    }
    async getAll(user, status){
        return await this.Reading.findAll({
            where: {
                userId: user
            },
            attributes: ['progress'],
            include: [
                {
                    model: this.Book,
                    as:'book',
                    attributes: ['title', 'coverUrl'],
                    include: [
                        {
                            model: this.Author,
                            as:'author',
                            attributes: ['name']
                        },
                        ///////////////si j'ai le temp, on fera un triage par categorie

                        // genre?{ //si le tri par genre est dans les paramettre de requete, on les ajoute
                        //     model: db.BookCategory,
                        //     as:'bookCategories',
                        //     include:[
                        //         {
                        //             model:db.Category,
                        //             as:'category',
                        //             attributes: ['name'],
                        //             order:[['name', 'ASC']]
                        //         }
                        //     ]
                        // }:undefined // si pas, on les ajoute pas
                    ]
                },
                {
                    model: this.Status,
                    as:'status',
                    attributes: ['name'],
                    where: status?{
                        name:status //on trie les lecture par status
                    }:undefined //si il n'y a pas de parametre(donc si on vx tout)
                }
            ]
        });
    }
    async getById (idReading, userId){
        console.log(this.Book.associations);     // doit contenir 'author'
        console.log(this.Reading.associations);  // doit contenir 'book'
       return await this.Reading.findOne({
            where: {
                id: idReading,
                userId: userId
            },
            attributes:['id', 'progress'],
            include:[
                {
                    model:this.Book,
                    as:'book',
                    attributes:['title', 'coverUrl', 'nbrPages'],
                    include:[
                        {
                            model: this.Author,
                            as:'author',
                            attributes:['name']
                        }
                    ]

                }
            ]
        }); 
    }
}
module.exports = ReadingRepository;