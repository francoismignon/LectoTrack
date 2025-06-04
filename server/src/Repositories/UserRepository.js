class UserRepository {

    constructor(UserModel) {
        this.User = UserModel;
    }

    async findByLogin(login) {
        return this.User.findOne({ where: { login: login } });
    }


    async create(userData) {
        return this.User.create(userData);
    }
}
module.exports = UserRepository;