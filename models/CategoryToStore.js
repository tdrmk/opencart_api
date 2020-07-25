const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");

class CategoryToStore extends Model {
  static async categories(store_id, { limit, offset } = {}) {
    const Category = require("./Category");
    const category_ids = await CategoryToStore.findAll({
      where: {
        store_id,
      },
      offset: offset || 0,
      limit: limit || 5,
    });
    const categories = await Promise.all(
      category_ids.map(async ({ category_id }) => {
        return await Category.with_id(category_id);
      })
    );
    return categories;
  }

  static async stores(category_id, { limit, offset } = {}) {
    const Store = require("./Store");
    const store_ids = await CategoryToStore.findAll({
      where: {
        category_id,
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

CategoryToStore.init(
  {
    category_id: {
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
    modelName: "CategoryToStore",
    tableName: "oc_category_to_store",
    timestamps: false,
  }
);

module.exports = CategoryToStore;
