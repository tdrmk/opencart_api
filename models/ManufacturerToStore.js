const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");

class ManufacturerToStore extends Model {}

ManufacturerToStore.init(
  {
    manufacturer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "ManufacturerToStore",
    tableName: "oc_manufacturer_to_store",
    timestamps: false,
  }
);
module.exports = ManufacturerToStore;
