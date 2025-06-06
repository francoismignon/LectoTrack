class BookRepository {
    constructor(BookModel) {
        this.Book = BookModel;
    }

    async getOrCreateBook(book) {
        return await this.Book.findOrCreate({
            where: {
                title: book.title,
                authorId: book.authorId
            },
            defaults: {
                authorId: book.authorId,
                nbrPages: book.nbrPages,
                coverUrl: book.coverUrl,
                title: book.title
            }
        });
    }
}
module.exports = BookRepository;