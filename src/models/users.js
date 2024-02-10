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
        allowNull: true,
      },
      email: {
        type: DataType.STRING,
        allowNull: true,
        unique: {
          args: true,
          msg: "Email Id can't be duplicate!",
        },
      },
      emailVerified: {
        type: DataType.INTEGER,
        defaultValue: 0,
      },
      mobileNo: {
        type: DataType.BIGINT,
        allowNull: false,
        unique: {
          args: true,
          msg: "Mobile number can't be duplicate!",
        },
      },
      password: {
        type: DataType.STRING,
        allowNull: true,
      },
      isDeleted: {
        type: DataType.INTEGER,
        defaultValue: 0,
      },
      role: {
        type: DataType.STRING,
        defaultValue: "USER",
      },
      createdBy: {
        allowNull: false,
        type: DataType.BIGINT,
      },
      updatedBy: {
        allowNull: false,
        type: DataType.BIGINT,
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
        },
        beforeBulkUpdate: (user, options) => {
          user.attributes.updatedAt = Math.floor(Date.now());
        },
        beforeBulkCreate: (user, options) => {
          user.attributes.createdAt = Math.floor(Date.now());
          user.attributes.updatedAt = Math.floor(Date.now());
        },
      },
    }
  );

  return User;
};
