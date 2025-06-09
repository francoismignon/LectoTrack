class CommentRepositrory{
    constructor(CommentModel){
        this.Comment = CommentModel;
    }

    async update(message) {
        return await this.Comment.update({
            content: message.message
        }, {
            where: {
                id:message.id
            },
        }
        );
    }

    async getAll(){
        return await this.Comment.findAll({
            attributes:['id', 'content']
        });
    }

    async create(comment){
        return await this.Comment.create({
            readingId:comment.readingId,
            pageNbr:comment.pageNbr,
            content: comment.content
        });
    }
}
module.exports = CommentRepositrory;