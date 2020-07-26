const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");

class ProductToCategory extends Model {
  static async products(category_id, { limit, offset } = {}) {
    const Product = require("./Product");
    const product_ids = await ProductToCategory.findAll({
      where: {
        category_id,
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

  static async categories(product_id, { limit, offset } = {}) {
    const Category = require("./Category");
    const category_ids = await ProductToCategory.findAll({
      where: {
        product_id,
      },
      offset: offset || 0,
      limit: limit || 5,
    });
    const categories = await Promise.all(
      category_ids.map(async ({ category_id }) => {
        return Category.with_id(category_id);
      })
    );
    return categories;
  }
}

ProductToCategory.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "ProductToCategory",
    tableName: "oc_product_to_category",
    timestamps: false,
  }
);

module.exports = ProductToCategory;
