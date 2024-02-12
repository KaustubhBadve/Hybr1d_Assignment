var router = require("express").Router();
const users = require("../controllers/users");
const validateToken = require("../middlewares/authorization");
const errors = require("../middlewares/validator/catalogs");

// to get all sellerlist
router.get("/buyer/list-of-sellers", validateToken("Buyer"), users.sellerList);

// to get item list associated with seller
router.get(
  "/buyer/seller-catalog/:seller_id",
  validateToken("Buyer"),
  errors.RETRIEVE_CATALOG_DETAILS,
  users.getListOfItems
);

// to create order
router.post(
    "/buyer/create-order/",
    validateToken("Buyer"),
    users.createOrder
  );

module.exports = router;
