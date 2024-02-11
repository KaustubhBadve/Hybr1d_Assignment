var router = require("express").Router();
const users = require("../controllers/users");
const validateToken = require("../middlewares/authorization");
const errors = require("../middlewares/validator/catalogs");

router.get("/buyer/sellerlist", validateToken("Buyer"), users.sellerList);

router.get(
  "/buyer/itemList/:id",
  validateToken("Buyer"),
  errors.RETRIEVE_CATALOG_DETAILS,
  users.getListOfItems
);

router.post(
    "/buyer/orderlist",
    validateToken("Buyer"),
    users.createOrder
  );

module.exports = router;