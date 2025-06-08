class ReadingService{
    constructor(ReadingRepository){
        this.readingRepository = ReadingRepository;
    }

    async update(reading){
        
    }

    async delete(idReading, userId){
        return await this.readingRepository.detele(idReading, userId);
    }

    async getReadingIncludeBook(idReading, userId){
        return await this.readingRepository.getReadingIncludeBook(idReading, userId)
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
    async getById(idReading, userId){
        return await this.readingRepository.getById(idReading, userId); 
    }
}
module.exports = ReadingService;