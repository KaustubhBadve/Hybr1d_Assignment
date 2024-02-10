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

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserByMobileNo,
};
