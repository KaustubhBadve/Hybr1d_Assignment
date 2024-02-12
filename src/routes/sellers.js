var router = require("express").Router();
const users = require("../controllers/users");
const validateToken = require("../middlewares/authorization");
const errors = require("../middlewares/validator/catalogs");

// to create new catalog
router.post(
  "/seller/create-catalog",
  validateToken("Seller"),
  errors.CATALOG_ADD,
  users.createNewCatalog
);

// to fetch all orders associated with seller
router.get(
    "/seller/orders",
    validateToken("Seller"),
    users.fetchOrdersForBuyers
  );

module.exports = router;
