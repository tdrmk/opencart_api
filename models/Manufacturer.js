const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");
const ManufacturerToStore = require("./ManufacturerToStore");

class Manufacturer extends Model {
  static async with_id(manufacturer_id) {
    return await Manufacturer.findOne({
      where: {
        manufacturer_id,
      },
    });
  }
  async stores({ limit, offset }) {
    return await ManufacturerToStore.stores(this.manufacturer_id, {
      limit: limit || 5,
      offset: offset || 0,
    });
  }
}

Manufacturer.init(
  {
    manufacturer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING(64),
    image: DataTypes.STRING(255),
    sort_order: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Manufacturer",
    tableName: "oc_manufacturer",
    timestamps: false,
  }
);
module.exports = Manufacturer;
