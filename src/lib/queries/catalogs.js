const db = require("../../models");
const constants = require("../../constants/constants");

createCatalog = async function (body) {
  return await db[constants.DB.table.CATALOG_MASTER].create(body);
};

updateCatalog = async function (obj, query) {
  await db[constants.DB.table.CATALOG_MASTER].update(obj, {
    where: query,
  });
};

module.exports = {
  createCatalog,
  updateCatalog
};
