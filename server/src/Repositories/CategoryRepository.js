class CategoryRepository {
    constructor(CategoryModel) {
        this.Category = CategoryModel;
    }

    async getOrCreateCategory(category) {
        return await this.Category.findOrCreate({
            where: {
                name: category
            },
            defaults: {
                name: category
            }
        });
    }
}
module.exports = CategoryRepository;