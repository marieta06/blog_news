const bcrypt = require('bcrypt');

const saltRound = 10;

exports.encrypt = async (password) => {
    const salt = await bcrypt.genSalt(saltRound);
    return bcrypt.hash(password, salt);
};

exports.compare = async (currentPassword, hashedPassword) => {
    return bcrypt.compare(currentPassword, hashedPassword);
};