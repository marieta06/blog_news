require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3001,
};

Object.freeze(config);

module.exports = config;