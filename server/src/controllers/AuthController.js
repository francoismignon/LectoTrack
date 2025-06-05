class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async register(req, res) {
        const { login, password, confirmPassword } = req.body;
        try {
            const newUser = await this.authService.create(login, password, confirmPassword);
            res.status(201).json(newUser);

        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    async login(req, res) {
        const { login, password } = req.body;
        try {
            const existingUser = await this.authService.login(login, password);
            if (existingUser) {
                res.status(200).json(existingUser);
            }
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    async logout(req, res) {
        //suppression du token jwt coté client
        res.status(200).json({
            message: "Deconnecter avec succes"
        });
    }
}
module.exports = AuthController;