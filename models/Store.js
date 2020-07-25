const sequelize = require("../config/database");
const { DataTypes, Model } = require("sequelize");

class Store extends Model {}

Store.init(
  {
    store_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(64),
    },
    url: {
      type: DataTypes.STRING(255),
    },
    ssl: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    modelName: "Store",
    tableName: "oc_store",
    timestamps: false,
  }
);

module.exports = Store;
