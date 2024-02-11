var router = require("express").Router();
const users = require("../controllers/users");
const validateToken = require("../middlewares/authorization");
const errors = require("../middlewares/validator/catalogs");

router.post(
  "/seller/newcatalog",
  validateToken("Seller"),
  errors.CATALOG_ADD,
  users.createNewCatalog
);

module.exports = router;
