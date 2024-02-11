module.exports = Object.freeze({
  DB: {
    table: {
      USERS_MASTER: "usersmaster",
      CATALOG_MASTER: "catalogmaster",
      ORDER_MASTER: "ordermaster",
      ORDER_MAPPING_MASTER: "ordermappingmaster",
    },
  },
  response_code: {
    SUCCESS: 200,
    MAX_SUCCESS_CODE: 299,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    JWT: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  jwt: {
    EXPIRE_BUYER: 172800,
    EXPIRE_SELLER: 432000,
  },
  STRING_CONSTANTS: {
    SUCCESS: "Success",
    SOME_ERROR_OCCURED: "Some error occurred while retrieving data.",
    MOBILE_NO_LENGTH_STRING: `Mobile number length should be greater than 10`,
    ENDPOINT_NOT_FOUND: "Endpoint not found at server",
    INVALID_AUTHORIZATION: "Unauthorized Request",
  },
  USER: ["Seller", "Buyer"],
});
