const response = require("../lib/response");
const constant = require("../constants/constants");
const jwt = require("jsonwebtoken");

const validateToken = (role) => (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.substring(7);
    jwt.verify(token, process.env.jwtsecret, (err, decoded) => {
      if (err) {
        return response.sendResponse(
          constant.response_code.UNAUTHORIZED,
          constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
          null,
          res,
          null
        );
      } else {
        if (decoded.role !== role) {
          return response.sendResponse(
            constant.response_code.UNAUTHORIZED,
            `You are not authorized to access this route as a ${role}`,
            null,
            res,
            null
          );
        }
        return next();
      }
    });
  } else {
    return response.sendResponse(
      constant.response_code.UNAUTHORIZED,
      constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
      null,
      res,
      null
    );
  }
};

module.exports = validateToken;
