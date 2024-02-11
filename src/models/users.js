const bcrypt = require("bcrypt");
const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    constant.DB.table.USERS_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        allowNull: true,
        unique: true
      },
      emailVerified: {
        type: DataType.INTEGER,
        defaultValue: 0,
      },
      mobileNo: {
        type: DataType.BIGINT,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: DataType.INTEGER,
        defaultValue: 0,
      },
      role: {
        type: DataType.STRING,
        defaultValue: "USER",
      },
      createdAt: {
        allowNull: false,
        type: DataType.BIGINT,
      },
      updatedAt: {
        allowNull: false,
        type: DataType.BIGINT,
      },
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          user.createdAt = Math.floor(Date.now());
          user.updatedAt = Math.floor(Date.now());
          if (user.password) {
            user.password = bcrypt.hashSync(user.password, 8);
          }
        },
        beforeUpdate: async (user, options) => {
          user.updatedAt = Math.floor(Date.now());
          if (user.password) {
            user.password = bcrypt.hashSync(user.password, 8);
          }
        }
      },
    }
  );

  return User;
};
