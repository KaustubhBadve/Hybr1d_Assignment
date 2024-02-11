const bcrypt = require("bcrypt");
const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const CATALOGS = sequelize.define(
    constant.DB.table.CATALOG_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      itemName: {
        type: DataType.STRING,
        allowNull: false,
      },
      price: {
        type: DataType.BIGINT,
        allowNull: false
      },
      category: {
        type: DataType.STRING,
        allowNull: true
      },
      coverImage: {
        type: DataType.STRING,
        allowNull: true
      },
      description: {
        type: DataType.STRING,
        allowNull: true
      },
      sellerId: {
        type: DataType.INTEGER,
        allowNull: false
      },
      isActive: {
        type: DataType.INTEGER,
        defaultValue: 1,
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
        },
        beforeUpdate: async (user, options) => {
          user.updatedAt = Math.floor(Date.now());
        }
      },
    }
  );

  return CATALOGS;
};
