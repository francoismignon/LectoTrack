class AuthService{
    
    constructor(userRepository){
        this.userRepository = userRepository;
    }
}
module.exports = AuthService;