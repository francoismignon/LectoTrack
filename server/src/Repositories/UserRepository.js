class UserRepository {

    constructor(UserModel, RoleModel) {
        this.User = UserModel;
        this.Role = RoleModel
    }

    async getByIdWithRole(id) {
        return await this.User.findOne({
            where: {
                id
            },
            attributes: ['login'],
            include: [
                {
                    model: this.Role,
                    as: 'role',
                    attributes: ['name']
                }
            ]
        });
    }

    async findByLogin(login) {
        return await this.User.findOne({ where: { login: login } });
    }


    async create(userData) {
        return await this.User.create(userData);
    }
}
module.exports = UserRepository;