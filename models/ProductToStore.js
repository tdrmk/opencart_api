const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");

class ProductToStore extends Model {
  static async products(store_id, { limit, offset } = {}) {
    const Product = require("./Product");
    const product_ids = await ProductToStore.findAll({
      where: {
        store_id,
      },
      offset: offset || 0,
      limit: limit || 5,
    });
    const products = await Promise.all(
      product_ids.map(async ({ product_id }) => {
        return await Product.with_id(product_id);
      })
    );
    return products;
  }

  static async stores(product_id, { limit, offset } = {}) {
    const Store = require("./Store");
    const store_ids = await ProductToStore.findAll({
      where: {
        product_id,
      },
      offset: offset || 0,
      limit: limit || 5,
    });
    const stores = await Promise.all(
      store_ids.map(async ({ store_id }) => {
        return Store.with_id(store_id);
      })
    );
    return stores;
  }
}

ProductToStore.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "ProductToStore",
    tableName: "oc_product_to_store",
    timestamps: false,
  }
);

module.exports = ProductToStore;
