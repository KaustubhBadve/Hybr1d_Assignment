const response = require("../lib/response");
const constant = require("../constants/constants");

const authorization = async (req, res, next) => {
  req.token = req.headers.authorization;

  if (!req.token) {
    return response.sendResponse(
      constant.response_code.UNAUTHORIZED,
      constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
      null,
      res,
      null
    );
  }
  next();
};

module.exports = authorization;
