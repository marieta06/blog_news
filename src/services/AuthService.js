const User = require('../models/user');
const {encrypt, compare} = require('../utils/crypt');
const {sign, verify} = require('../utils/jwt-auth');

class AuthService {
    async register(fullName, email, password) {
        const isExistUser = await this.#findUserByEmail(email);

        if (isExistUser) {
            throw new Error(`User with this ${email} already exist`);
        }

        const hashedPassword = await encrypt(password);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        delete user.dataValues.password;
        return user.dataValues;
    }

    async login(email, password) {
        const user = await this.#findUserByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) throw new Error('invalid credentials');

        return user.dataValues;
    }

    async #findUserByEmail(email) {
        return User.findOne({
            where: {email}
        });
    }

    generateToken(payload) {
        const accessToken = sign(payload, process.env.JWT_SECRET, 86400);
        return {accessToken};
    }

    verifyToken(token) {
        const {id, email} = verify(token, process.env.JWT_SECRET);
        return {
            id,
            email
        };
    }

    async verify(id, currentPassword) {

        const user = await User.findOne({
            where: {id}
        });

        const {password} = user;
        const isMatch = await compare(currentPassword, password);

        if (isMatch) {
            user.isValid = true;
            await user.save();

            return true;
        }

        return false;
    }

    async reset(newPassword, confirmPassword, id) {
        const user = await User.findOne({
            where: {id}
        });

        if (confirmPassword !== newPassword) {
            throw new Error('Passwords do not match');
            return;
        }

        user.password = await encrypt(newPassword);
        await user.save();
    }
}

module.exports = new AuthService();
