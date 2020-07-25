const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");

class ManufacturerToStore extends Model {
  static async manufacturers(store_id, { limit, offset } = {}) {
    const Manufacturer = require("./Manufacturer");
    const store_ids = await ManufacturerToStore.findAll({
      where: {
        store_id,
      },
      offset: offset || 0,
      limit: limit || 5,
    });
    const manufacturers = await Promise.all(
      store_ids.map(async ({ manufacturer_id }) => {
        return await Manufacturer.with_id(manufacturer_id);
      })
    );
    return manufacturers;
  }

  static async stores(manufacturer_id, { limit, offset } = {}) {
    const Store = require("./Store");
    const manufacturer_ids = await ManufacturerToStore.findAll({
      where: {
        manufacturer_id,
      },
      offset: offset || 0,
      limit: limit || 5,
    });
    const stores = await Promise.all(
      manufacturer_ids.map(async ({ store_id }) => {
        return await Store.with_id(store_id);
      })
    );
  }
}

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
