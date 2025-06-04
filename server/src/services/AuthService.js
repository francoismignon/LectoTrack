const bcrypt = require('bcrypt');

class AuthService{
    
    constructor(userRepository){
        this.userRepository = userRepository;
    }
    
    async create(login, password, confirmPassword  ){
        const saltRound = 10;
        //formater correctement l'entrée (BL)
        const loginFormatted = login.slice(0,1).toUpperCase() + login.slice(1).toLowerCase();

        //Verifie si l'utilisateur existe déja
        const existingUser = await this.userRepository.findByLogin(loginFormatted);
        
        if(existingUser){
            //Creation manuel d'un code d'erreur, il sera recupere dans le try/catch pour pouvoir renvoyer correctement un message json
            const err = new Error("L'utilisateur existe déja");
            err.statusCode = 409;
            throw err;
        }

        //Verifier si le mot de passe correspont a la verification(BL)
        if(password !== confirmPassword){
            const err = new Error("Les mots de passe ne correpondent pas");
            err.statusCode = 401;
            throw err;
        }
        //Hachage (BL)
        const hashPassword = await bcrypt.hash(password, saltRound);
        //creation de l'utilisateur (BL)
        const newUser = await this.userRepository.create({
            login: loginFormatted,
            password: hashPassword
        });
        //on ne retourne que le necessaire
        return ({
            id:newUser.id,
            login:newUser.login,
            roleId:newUser.roleId
        });
    }
}
module.exports = AuthService;