const AuthService = require('../../src/services/AuthService');


//On dois simuler les valeur de retour de bcrytp et je jwt
jest.mock('bcrypt', ()=>({ 
    hash:jest.fn().mockResolvedValue('hashedPassword'),
    compare:jest.fn().mockResolvedValue(true),
}));

jest.mock('jsonwebtoken', ()=>({
    sign:jest.fn(()=>'fake.jwt.token')
}));

//vu que mon services appel un repository, on dois en creer un faux pour pouvoir instancier ma classe service (findByLogin et create)
const userRepository = {
    findByLogin:jest.fn(),
    create:jest.fn()
}

//instanciation de ma classe
const authService = new AuthService(userRepository);

//Reset des tests
beforeEach(() => jest.clearAllMocks());



describe('AuthService', ()=>{
    //On test la methode formatLogin
    it('formatLogin formate correctement le login', ()=>{
        expect(authService.formatLogin('fRAnCOis')).toBe('Francois');
    });
    //On test bcrypt
    it('create crée un nouvel utilisateur et renvoye ses infos', async()=>{
        userRepository.findByLogin.mockResolvedValue(null); //l'utilisateur dois etre inexistant pour pouvoir le creer
        userRepository.create.mockResolvedValue({id:1, login:'François', roleId:2});//On simule les valeur de retour

        await expect(authService.create('françois', 'password', 'password')).resolves.toEqual({id:1, login:'François', roleId:2});//on entre des donnée validé (remarque le login) et on s'attend a ce retour

        expect(userRepository.create).toHaveBeenCalledWith({
            login : 'François', //login formater
            password : 'hashedPassword' //mdp haché avec le mock bcrypt declarer plus haut
        });
    });
    //On test findByLogin
    it('login renvoie le token JWT et les infos utilisateur', async()=>{
        userRepository.findByLogin.mockResolvedValue({id:1, login:'François', roleId:2, password:'hashedPassword'}); //on simule la reponse dans le repository

        await expect(authService.login('françois', 'password')).resolves.toEqual({
            id:1,
            login:'François',
            roleId:2,
            token:'fake.jwt.token'
        });
    });
});





