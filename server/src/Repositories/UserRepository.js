class UserRepository {

    constructor(UserModel) {
        this.User = UserModel;
    }

    async findByLogin(login) {
        return await this.User.findOne({ where: { login: login } });
    }


    async create(userData) {
        return await this.User.create(userData);
    }
}
module.exports = UserRepository;