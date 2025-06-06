class ReadingRepository{
    constructor(ReadingModel){
        this.Reading = ReadingModel;
    }

    async create(Reading){
        return await this.Reading.create({
            bookId:Reading.bookId,
            userId:Reading.userId,
            progress:0
            // le status par defaut (non commencé) est ajouter par migration
        });
    }
}
module.exports = ReadingRepository;