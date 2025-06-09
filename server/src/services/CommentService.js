class CommentService{
    constructor(CommentRepository){
        this.commentRepository = CommentRepository;
    }

    async update(message){
        return this.commentRepository.update(message);
    }

    async getAll(){
        return await this.commentRepository.getAll();
    }

}
module.exports = CommentService;