const Koa = require("koa");
const config = require('./src/config/config');
const sequelize = require('./src/db/seeders/connection');
const router = require('./src/routes/index')
const { koaBody } = require('koa-body');

const app = new Koa();
const PORT = config.PORT;
app.use(koaBody());
app.use(router.routes());


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


