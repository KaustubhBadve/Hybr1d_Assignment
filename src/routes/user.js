var router = require("express").Router();
const users = require("../controllers/users");
const errors = require("../middlewares/validator/users");

// for user registration
router.post("/user/signup", errors.USER_REGISTRATION, users.userRegistration);

// for user login
router.post("/user/login", errors.USER_LOGIN, users.userLogin);

module.exports = router;
