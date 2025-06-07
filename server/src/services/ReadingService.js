class ReadingService{
    constructor(ReadingRepository){
        this.readingRepository = ReadingRepository;
    }
    async getBookByIdAndUserId(bookId, userId){
        return await this.readingRepository.getBookByIdAndUserId(bookId, userId);
    }

    async create(reading){ 
        //on cree la nouvelle lecture
        return await this.readingRepository.create(reading);
    }
    async getAll(user, status){
        return await this.readingRepository.getAll(user, status);
    }
}
module.exports = ReadingService;