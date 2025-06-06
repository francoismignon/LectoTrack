class AuthorRepository {
    constructor(AuthorModel) {
        this.Author = AuthorModel;
    }

    async getOrCreateAuthorByName(name) {
        return await this.Author.findOrCreate({
            where: { name: name }, //critere de recherche
            defaults: { name: name } //valeur ajoutée si pas trouvé
        });
    }
}
module.exports = AuthorRepository;