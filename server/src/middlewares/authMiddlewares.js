//middleware
const jwt = require('jsonwebtoken');

function checkTokenJwt(req, res, next) {
    try {
        //on verifie si le token de l'utilisateur present
        const authHeader = req.headers.authorization;
        //si non => message d'erreur 
        if (!authHeader) {
            const err = new Error("Token manquant");
            err.statusCode = 401;
            throw err;
        }
        //on verifie si le token de l'utilisateur valide
        const token = authHeader.split(' ')[1]//on decoupe la chaine en deux en utilisant l'espace comme "pivot", on selectionne l'index 1 du tableau

        //on decode le token avec la methode verify de jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            const err = new Error("token invalide");
            err.statusCode = 403;
            throw err;
        }
        //on injecte le token valide dans la requete
        req.user = decoded;
        next();//middleware suivant ou bien route

    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}
function checkRole(){

}
module.exports = {checkTokenJwt, checkRole};