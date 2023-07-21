const Router = require('koa-router');
const AuthController = require('../controllers/AuthController');
const authorize = require('../middlewares/authorize');

const router = new Router();

router.prefix("/api/v1/auth");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify", authorize, AuthController.verify);
router.patch("/reset", authorize, AuthController.reset);

module.exports = router;