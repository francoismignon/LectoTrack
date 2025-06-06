class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async getOrCreateCategory(categories) {
        const categoriesList = [];
        for (let i = 0; i < categories.length; i++) {
            const [genre] = await this.categoryRepository.getOrCreateCategory(categories[i]);
            categoriesList.push(genre);
        }
        //Cree un tableau des ids des genre (besoin pour FK)
        const categoriesListIds = categoriesList.map(cat => cat.id);
        return categoriesListIds;
    }
}
module.exports = CategoryService;