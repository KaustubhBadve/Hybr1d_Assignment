const { check } = require("express-validator");
const constants = require("../../constants/constants");

const Errors = {
  USER_REGISTRATION: [
    check("userName", "userName should not be empty").notEmpty(),
    check(
      "mobileNo",
      "Mobile Number should be numeric and length must be 10 digit"
    )
      .isNumeric()
      .isInt({ gt: 999999999 })
      .notEmpty()
      .isLength({ min: 10, max: 10 }),
    check(
      "password",
      "Password should not be empty and length must be 6 to 15 digits"
    )
      .isString()
      .notEmpty()
      .isLength({ min: 6, max: 15 }),
    check("email", "email should be valid and not empty")
      .optional()
      .isEmail()
      .notEmpty(),
    check("role", "Role should be either Seller or Buyer")
      .notEmpty()
      .isIn(constants.USER),
  ],
  USER_LOGIN: [
    check("userName", "userName should not be empty").notEmpty(),
    check("mobileNo", "Mobile No should be numeric and length must be 10 digit")
      .isNumeric()
      .isInt({ gt: 999999999 })
      .notEmpty()
      .isLength({ min: 10, max: 10 }),
    check("password", "Please enter the valid password")
      .isString()
      .notEmpty()
      .isLength({ min: 6, max: 16 }),
  ],
};
module.exports = Errors;
