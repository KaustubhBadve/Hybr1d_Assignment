require("dotenv").config();
const { validationResult } = require("express-validator");
const response = require("../lib/response");
const constant = require("../constants/constants");
const query = require("../lib/queries/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var passwordValidator = require("password-validator");
const schema = new passwordValidator();

const passswordValidate = (password) => {
  schema
    .is()
    .min(6)
    .is()
    .max(10)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(2)
    .has()
    .not()
    .spaces();

  const validationResult = schema.validate(password);

  return validationResult;
};

exports.userRegistration = async (req, res) => {
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    const body = req.body;

    const isValidPassword = passswordValidate(body?.password);

    if (!isValidPassword) {
      errors.errors.push({
        msg: "A minimum of one uppercase and lowercase character, as well as no spaces, are required in the password.",
      });
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    let alreadyExists = await query.getUserByMobileNo(body.mobileNo);

    if (alreadyExists) {
      errors.errors.push({
        msg: `User already exists with mobileNo ${body.mobileNo}`,
      });
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        null,
        null,
        res,
        errors
      );
    }

    let newUser = {
      name: body?.userName,
      password: body.password,
      mobileNo: body?.mobileNo,
      role: body?.role,
    };

    query.createUser(newUser);

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Registration Succesfull",
      null,
      res,
      null
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

exports.userLogin = async (req, res) => {
  try {
    let errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return response.sendResponse(
        constant.response_code.BAD_REQUEST,
        null,
        null,
        res,
        errors
      );
    }

    const body = req.body;

    let user = await query.getUserByMobileNo(body.mobileNo);

    if (!user) {
      errors.errors.push({
        msg: `User not found with mobileNo ${body.mobileNo}`,
      });
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        null,
        null,
        res,
        errors
      );
    }

    const passwordMatch = await bcrypt.compareSync(
      body.password,
      user.password
    );

    if (!passwordMatch) {
      errors.errors.push({
        msg: "Please check mobile number or password",
      });
      return response.sendResponse(
        constant.response_code.UNAUTHORIZED,
        null,
        null,
        res,
        errors
      );
    }

    const userDataForToken = {
      name: user?.name,
      mobileNo: user?.mobileNo,
      role: user?.role,
    };

    token = await genNewToken(userDataForToken, res);

    let userInfo = {
      name: user?.name,
      mobileNo: user?.mobileNo,
      role: user?.role,
      token,
    };

    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Login Successful",
      userInfo,
      res,
      null
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

const genNewToken = async (payload, res) => {
  try {
    var token = jwt.sign(payload, process.env.jwtsecret, {
      expiresIn: constant.jwt.EXPIRE_SELLER,
    });
    return token;
  } catch (err) {
    console.log(`Error in generating token: ${err}`);
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      "Error in generating token",
      null,
      res
    );
  }
};
