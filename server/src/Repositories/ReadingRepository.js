class ReadingRepository {
    constructor(ReadingModel) {
        this.Reading = ReadingModel;
    }

    async create(reading) {
        return await this.Reading.create(reading);
    }

    async getBookByIdAndUserId(bookId, userId) {
        return await this.Reading.findOne({
            where: {
                bookId: bookId,
                userId: userId
            }
        });
    }
}
module.exports = ReadingRepository;