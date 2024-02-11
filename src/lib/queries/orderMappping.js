const db = require("../../models");
const constants = require("../../constants/constants");

createOrderMapping = async function (body) {
  return await db[constants.DB.table.ORDER_MAPPING_MASTER].create(body);
};

createOrderMappingBulk = async function (body) {
  return await db[constants.DB.table.ORDER_MAPPING_MASTER].bulkCreate(body, {
    updateOnDuplicate: ["orderId"],
  });
};

module.exports = {
  createOrderMapping,
  createOrderMappingBulk
};
