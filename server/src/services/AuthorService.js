class AuthorService{
    constructor(AuthorRepository){
        this.authorRepository = AuthorRepository;
    }

    async getOrCreateAuthor(authorName){
        const [author] = await this.authorRepository.getOrCreateAuthorByName(authorName);
        const {id: authorId} = author //on extrait l'id de l'autheur pour l'ajouter au livre
        return authorId;
    }
}
module.exports = AuthorService;