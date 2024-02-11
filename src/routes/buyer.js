
var router = require("express").Router();
const users = require("../controllers/users");
const validateToken = require("../middlewares/authorization");

router.get("/buyer/sellerlist", validateToken('Buyer'), users.sellerList);

module.exports = router;

