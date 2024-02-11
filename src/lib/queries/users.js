const db = require("../../models");
const constants = require("../../constants/constants");

createUser = async function (body) {
  return await db[constants.DB.table.USERS_MASTER].create(body);
};

updateUser = async function (obj, query) {
  await db[constants.DB.table.USERS_MASTER].update(obj, {
    where: query,
  });
};

deleteUser = async function (id) {
  await db[constants.DB.table.USERS_MASTER].update(
    { isDeleted: 1 },
    {
      where: { id },
    }
  );
};

getUserByMobileNo = async function (mobileNo) {
  const user = await db[constants.DB.table.USERS_MASTER].findOne({
    where: { isDeleted: 0, mobileNo },
  });
  return user ? user.dataValues : null;
};

getUsersList = async function (role) {
  return await db[constants.DB.table.USERS_MASTER].findAll({
    where: { isDeleted: 0, role},
    attributes: ["id", "name", "mobileNo", "email"],
  });
};

getUserByIdForBuyer = async function (id) {
  const user = await db[constants.DB.table.USERS_MASTER].findOne({
    where: { isDeleted: 0, id, role:"Seller"},
  });
  return user ? user.dataValues : null;
};

getUserById = async function (id) {
  return await db[constants.DB.table.USERS_MASTER].findByPk(id);
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserByMobileNo,
  getUsersList,
  getUserById,
  getUserByIdForBuyer
};
