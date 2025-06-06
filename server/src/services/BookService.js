class BookService {

    constructor(BookRepository) {
        this.bookRepository = BookRepository;
    }
    async getOrCreateBook(bookData) {
        //Mise a jour dela table des livres
        const [book] = await this.bookRepository.getOrCreateBook(bookData);
        const { id: bookId } = book;
        return bookId;
    }
}
module.exports = BookService;