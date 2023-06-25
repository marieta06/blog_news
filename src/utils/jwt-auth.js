const jwt = require('jsonwebtoken');
exports.sign = (payload, secret, tokenLifeTime, tokenType = "access") => {
    try {
        return jwt.sign(payload, secret, {
            algorithm: "HS256",
            expiresIn: tokenLifeTime,
            header: {
                tokenType
            }
        });
    } catch (error) {
        console.log(error.message);
        throw new Error("Unauthorized");
    }
};
exports.verify = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error("Unauthorized");
    }
};