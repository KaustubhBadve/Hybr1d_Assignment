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

getCatalogsList = async function (sellerId) {
  return await db[constants.DB.table.CATALOG_MASTER].findAll({
    where: { isActive: 1, sellerId},
    attributes: ["id", "itemName", "price", "currency", "description","coverImage"],
  });
};

checkCatalogItemIds = async function(itemIds) {
    return await db[constants.DB.table.CATALOG_MASTER].findAll({
      where: { id: itemIds },
      attributes: ["id","price"],
    });
};


module.exports = {
  createCatalog,
  updateCatalog,
  getCatalogsList,
  checkCatalogItemIds
};
