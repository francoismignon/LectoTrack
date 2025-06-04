const bcrypt = require('bcrypt');

class AuthService{
    
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async isExistingUser(login){
        return await this.userRepository.findByLogin(login);
    }

    formatLogin(login) {
        return login.slice(0,1).toUpperCase() + login.slice(1).toLowerCase();
    }
    
    async create(login, password, confirmPassword  ){
        const saltRound = 10;
        //formater correctement l'entrée (BL)
        const loginFormatted = this.formatLogin(login);

        //Verifie si l'utilisateur existe déja
        this.isExistingUser(loginFormatted);
        const existingUser = await this.isExistingUser(loginFormatted);
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
    async login(login, password){
        //formater correctement l'entrée (BL)
        const loginFormatted = this.formatLogin(login);

        //Verifie si l'utilisateur existe déja
        const existingUser = await this.isExistingUser(loginFormatted);
        //erreur si l'utilisateur n'existe pas
        if(!existingUser){
            const err = new Error("L'utilisateur n'existe pas encore");
            err.statusCode = 401;
            throw err;
        }
        //verifier si le mdp coeerespond au mdp en db (BL)
        const isMatch = bcrypt.compare(password, existingUser.password);
        if (isMatch) {
            console.log("mot de passe correct");
        } else {
            console.log("mot de passe incorrect");
        }

    }
}
module.exports = AuthService;