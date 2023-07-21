const { Sequelize } = require('sequelize');
const config = require('../../config/config');
const sequelize = new Sequelize(config.DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: config.dialect
});

module.exports = sequelize;
