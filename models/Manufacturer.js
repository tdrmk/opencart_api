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
  async stores() {
    const m2s_list = await Promise.all(
      await ManufacturerToStore.findAll({
        where: {
          manufacturer_id: this.manufacturer_id,
        },
      })
    );
    const Store = require("./Store");
    const stores = await Promise.all(
      m2s_list.map(async ({ store_id }) => {
        return await Store.with_id(store_id);
      })
    );
    return stores;
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
