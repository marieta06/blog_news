const Koa = require("koa");
const config = require('./src/config/config');
const app = new Koa();
const PORT = config.PORT;


const sequelize = require('./src/db/seeders/connection');

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server listening on port: ${PORT}`);
        });
        await sequelize.authenticate();
        console.log('Database successfully connected');
    } catch (error) {
        console.log('Unable to connect to the database ', error.message);
    }
};
start();