const express = require(`express`);
const router = express.Router();
const userController = require(`../controllers/userController`);

router.route('/register').post(userController.signUp);
router.route('/login').post(userController.signIn);

module.exports = router;