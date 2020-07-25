const sequelize = require("../config/database");
const { DataTypes, Model } = require("sequelize");
const ManufacturerToStore = require("./ManufacturerToStore");

class Store extends Model {
  static async with_id(store_id) {
    return await Store.findOne({
      where: {
        store_id,
      },
    });
  }
  async manufacturers() {
    // expensive call
    const m2s_list = await Promise.all(
      await ManufacturerToStore.findAll({
        where: {
          store_id: this.store_id,
        },
      })
    );
    const Manufacturer = require("./Manufacturer");

    const manufacturers = await Promise.all(
      m2s_list.map(async ({ manufacturer_id }) => {
        return await Manufacturer.with_id(manufacturer_id);
      })
    );
    return manufacturers;
  }
}

Store.init(
  {
    store_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING(64),
    url: DataTypes.STRING(255),
    ssl: DataTypes.STRING(255),
  },
  {
    sequelize,
    modelName: "Store",
    tableName: "oc_store",
    timestamps: false,
  }
);

module.exports = Store;
