class BookCategoryepository {
    constructor(BookCategoryModel) {
        this.BookCategory = BookCategoryModel;
    }

    async getOrCreateBookCategory(BookCategory) {
        return await this.BookCategory.findOrCreate({
            where: {
                bookId: BookCategory.bookId,
                categoryId: BookCategory.categoryId
            },
            defaults: {
                bookId: BookCategory.bookId,
                categoryId: BookCategory.categoryId
            }
        });
    }
}
module.exports = BookCategoryepository;