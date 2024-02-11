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
      quantity: {
        type: DataType.BIGINT,
        allowNull: true
      }
    }
  );

  return OrderMappingMaster;
};
