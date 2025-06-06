class BookCategoryService {
    constructor(BookCategoryRepository) {
        this.bookCategoryRepository = BookCategoryRepository;
    }

    async getOrCreateBookCategory(bookId, categoriesListIds) {
        const bookCategory = [];
        for (let i = 0; i < categoriesListIds.length; i++) {
            const BookCategoryData = {
                bookId: bookId,
                categoryId: categoriesListIds[i]
            };
            const [listBookIdCatId] = await this.bookCategoryRepository.getOrCreateBookCategory(BookCategoryData);
            bookCategory.push(listBookIdCatId);
        }
    }
}
module.exports = BookCategoryService;