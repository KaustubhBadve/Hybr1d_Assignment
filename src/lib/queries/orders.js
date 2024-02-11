const db = require("../../models");
const constants = require("../../constants/constants");

createOrder = async function (body) {
  return await db[constants.DB.table.ORDER_MASTER].create(body);
};


module.exports = {
  createOrder
};
