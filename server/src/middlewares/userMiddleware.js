const db = require('../models');
const UserRepository = require('../Repositories/UserRepository.js');
const UserService = require('../services/UserService.js');

const userRepository = new UserRepository(
    db.User,
    db.Role
);
const userService = new UserService(userRepository);

checkRole = async (req, res, next) =>{
    try {
        const { id: userId } = req.user;
        //Vu qu'il s'agit de lister tous les commentaires, pour pouvoir les modéré par l'admin, on dois verifier le Role de l'utilisateur incrit.

        //verification du roles, on va chercher le role associer a l'utilisateur connecté
        const {role:{name}} = await userService.getByIdWithRole(userId);
        if (!name) {
            const err = new Error("L'utilisateur n'as pas été trouvé");
            err.statusCode = 404;
            throw err;
        }
        //Si le role est lecteur, l'utilisateur ne px pas acceder a cette route
        if (name === 'Lecteur') {
            const err = new Error(`${name} n'as pas le droit d'acceder à cette page`);
            err.statusCode = 403;
            throw err;
        }
        req.role = name;
        next();
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}
module.exports = checkRole;