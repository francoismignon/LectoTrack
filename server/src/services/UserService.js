class UserService{
    constructor(UserRepository){
        this.userRepository = UserRepository;
    }

    async getByIdWithRole(id){
        return await this.userRepository.getByIdWithRole(id);
    }
}
module.exports = UserService;