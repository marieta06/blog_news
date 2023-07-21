const {verifyToken} = require('../services/AuthService');

module.exports = (ctx, next) => {
    const {authorization: token} = ctx.headers;

    if (!token) {
        throw new Error("unauthorized");
    }

    ctx.state.user = verifyToken(token);
    return next();
};