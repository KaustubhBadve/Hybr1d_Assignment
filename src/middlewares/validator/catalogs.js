const { check } = require("express-validator");

const Errors = {
  CATALOG_ADD: [
    check("itemName", "itemName should not be empty").isString().notEmpty(),
    check("price", "Item price should be numeric and not empty")
      .isNumeric()
      .isInt({ gt: 0 })
      .notEmpty(),
    check(
      "description",
      "Item description should not be empty and should be string"
    )
      .isString()
      .optional()
      .notEmpty(),
    check("category", "Item category should not be empty and should be string")
      .isString()
      .optional()
      .notEmpty(),
  ],
};
module.exports = Errors;
