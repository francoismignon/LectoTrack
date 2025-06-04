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
}
module.exports = AuthController;