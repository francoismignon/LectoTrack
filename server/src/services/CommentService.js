class CommentService{
    constructor(CommentRepository){
        this.CommentRepository = CommentRepository;
    }

    async create(comment){
        return await this.commentRepository.create({
            readingId: comment.idReading,
            pageNbr,
            content
        });
    }
    
}
module.export = CommentService;