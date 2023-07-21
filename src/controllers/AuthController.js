const AuthService = require('../services/AuthService');

class AuthController {
    async login(ctx) {
        try {
            const {email, password} = ctx.request.body;

            const user = await AuthService.login(email, password);
            const token = AuthService.generateToken(user);

            ctx.status = 200;
            ctx.body = {token, user};
        } catch (error) {
            ctx.status = 401;
            ctx.body = error.message;
        }
    }

    async register(ctx) {
        try {
            const {fullName, email, password} = ctx.request.body;

            const user = await AuthService.register(fullName, email, password);
            const token = AuthService.generateToken(user);

            ctx.status = 201;
            ctx.body = {token, user};
        } catch (error) {
            ctx.status = 500;
            ctx.body = error.message;
        }
    }

    async verify(ctx) {
        try {
            const {id} = ctx.state.user;
            const {currentPassword} = ctx.request.body;

            const isVerified = await AuthService.verify(id, currentPassword);

            if (isVerified) {
                ctx.status = 200;
                ctx.body = {isVerified: 'Correct password'};
            } else {
                ctx.status = 401;
                ctx.body = {message: 'Incorrect password'};
            }
        } catch (error) {
            ctx.status = 500;
            ctx.body = error.message;
        }
    }

    async reset(ctx) {
        try {
            const {newPassword, confirmPassword} = ctx.request.body;
            const {id} = ctx.state.user;

            await AuthService.reset(newPassword, confirmPassword, id);

            ctx.status = 200;
            ctx.body = {message: 'Password changed successfully'};
        } catch (error) {
            ctx.status = 500;
            ctx.body = error.message;
        }
    }

}

module.exports = new AuthController();