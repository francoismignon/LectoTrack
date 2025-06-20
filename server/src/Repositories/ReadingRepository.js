class ReadingRepository {
    constructor(ReadingModel, BookModel, AuthorModel, StatusModel, CommentModel) {
        this.Reading = ReadingModel;
        this.Book = BookModel;
        this.Author = AuthorModel;
        this.Status = StatusModel;
        this.Comment = CommentModel;
    }

    async getAllCommentsByReadingId(reading){
        return await this.Reading.findAll({
            where: {
                id: reading.idReading,
                userId: reading.userId
            },
            attributes: ['progress'],
            include: [
                {
                    model: this.Comment,
                    as: 'comments',
                    attributes: ['pageNbr', 'content']
                },
                {
                    model: this.Book,
                    as: 'book',
                    attributes: ['coverUrl', 'title'],
                    include:[
                        {
                            model:this.Author,
                            as:'author',
                            attributes:['name']
                        }
                    ]
                }
            ]

        });
    }

    async update(reading) {
        return await this.Reading.update({
            progress: reading.progress,
            statusId: reading.statusId
        },
            {
                where: {
                    id: reading.idReading,
                    userId:reading.userId
                }
            });
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
    async getAll(user, status, page, limit) {
        const offset = (page - 1) * limit
        const result = await this.Reading.findAndCountAll({
            where: {
                userId: user
            },
            attributes: ['id', 'progress'],
            include: [
                {
                    model: this.Book,
                    as: 'book',
                    attributes: ['title', 'coverUrl'],
                    include: [
                        {
                            model: this.Author,
                            as: 'author',
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
                    as: 'status',
                    attributes: ['name'],
                    where: status ? {
                        name: status //on trie les lecture par status
                    } : undefined //si il n'y a pas de parametre(donc si on vx tout)
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
        return {
            data: result.rows,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(result.count / limit),
                totalItems: result.count
            }
        };
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