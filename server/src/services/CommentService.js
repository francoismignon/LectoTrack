class CommentService{
    constructor(CommentRepository){
        this.commentRepository = CommentRepository;
    }

    async getAll(){
        return await this.commentRepository.getAll();
    }

}
module.exports = CommentService;