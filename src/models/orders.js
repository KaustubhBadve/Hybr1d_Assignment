const bcrypt = require("bcrypt");
const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const orderMaster = sequelize.define(
    constant.DB.table.ORDER_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      sellerId: {
        type: DataType.BIGINT,
        allowNull: false,
      },
      buyerId: {
        type: DataType.BIGINT,
        allowNull: false
      },
      totalCartValue: {
        type: DataType.BIGINT,
        allowNull: false
      },
      address: {
        type: DataType.STRING,
        allowNull: false
      },
      pincode: {
        type: DataType.BIGINT,
        allowNull: true
      },
      city: {
        type: DataType.STRING,
        allowNull: true,
      },
      status: {
        type: DataType.STRING,
        allowNull: true,
      },
      isCancled: {
        type: DataType.INTEGER,
        defaultValue: 0,
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

  return orderMaster;
};
