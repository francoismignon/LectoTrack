class ReadingService{
    constructor(ReadingRepository, CommentRepository){
        this.readingRepository = ReadingRepository;
        this.CommentRepository = CommentRepository;
    }

    async update(reading){
        //On calcule le pourcentage de progression
        const progress = Math.round((reading.pageNbr/reading.nbrPages) * 100); //suppression des chiffres apres la vigurle
        //On ajoute le commentaire et le numero de page dans la table Comments
        await this.CommentRepository.create({
            readingId:reading.idReading,
            pageNbr:reading.pageNbr,
            content:reading.content
        });
        //On met a jour le pourcentage de progression et si la progression est superieur a 0% ou atteind 100%, on met a jour le status dans la tables Readings
            //0%=> non commencé
            //>0% => en cours
            //1àà% => Terrminer
        if (progress === 100) {
            await this.readingRepository.update({
                progress,
                statusId: 3,
                idReading:reading.idReading,
                userId:reading.userId
            });
        } else if (progress > 0) {
            await this.readingRepository.update({
                progress,
                statusId: 2,
                idReading:reading.idReading,
                userId:reading.userId
            });
        }
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