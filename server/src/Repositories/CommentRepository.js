class CommentRepositrory{
    constructor(CommentModel){
        this.Comment = CommentModel;
    }

    async create(comment){
        return await this.Comment.create({
            readingId:comment.readingId,
            pageNbr:comment.pageNbr, //version abregée car c'est le meme nom
            content: comment.content
        });
    }
}
module.exports = CommentRepositrory;