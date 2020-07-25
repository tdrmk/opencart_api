const sequelize = require("../config/database");
const { DataTypes, Model } = require("sequelize");
const ManufacturerToStore = require("./ManufacturerToStore");
const ProductToStore = require("./ProductToStore");

class Store extends Model {
  static async with_id(store_id) {
    return await Store.findOne({
      where: {
        store_id,
      },
    });
  }
  async manufacturers({ offset, limit }) {
    return await ManufacturerToStore.manufacturers(this.store_id, {
      offset: offset || 0,
      limit: limit || 5,
    });
  }
  async products({ offset, limit }) {
    return await ProductToStore.products(this.store_id, {
      offset: offset || 0,
      limit: limit || 5,
    });
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
