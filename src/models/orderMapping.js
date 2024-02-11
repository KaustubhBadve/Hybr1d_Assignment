const bcrypt = require("bcrypt");
const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const OrderMappingMaster = sequelize.define(
    constant.DB.table.ORDER_MAPPING_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      orderId: {
        type: DataType.BIGINT,
        allowNull: false,
      },
      itemId: {
        type: DataType.BIGINT,
        allowNull: false
      },
      price: {
        type: DataType.STRING,
        allowNull: false
      },
      quantity: {
        type: DataType.BIGINT,
        allowNull: true
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

  return OrderMappingMaster;
};
