const Koa = require("koa");
const config = require('./src/config/config');

const app = new Koa();
const PORT = config.PORT;


app.use(async (ctx) => {
    ctx.body = "Hello world!!!";
});

app.listen(PORT);
console.log(`Server listening on port:${PORT}`);

