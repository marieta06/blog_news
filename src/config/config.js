require('dotenv').config();

const config = {
    PORT: process.env.PORT || 3001,
    DATABASE: process.env.DB_NAME || '',
    DB_HOST: process.env.HOST || '',
    DB_USERNAME: process.env.DB_USERNAME || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    dialect: 'postgres'
};

Object.freeze(config);

module.exports = config;