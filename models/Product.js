const sequelize = require("../config/database");
const { DataTypes, Model } = require("sequelize");
const ProductDescription = require("./ProductDescription");
const Manufacturer = require("./Manufacturer");
const ProductToStore = require("./ProductToStore");
const ProductToCategory = require("./ProductToCategory");

class Product extends Model {
  static async with_id(product_id) {
    return await Product.findOne({
      where: {
        product_id,
      },
    });
  }
  async product_description() {
    return await ProductDescription.with_id(this.product_id);
  }
  async manufacturer() {
    return await Manufacturer.with_id(this.manufacturer_id);
  }
  async categories({ limit, offset }) {
    return await ProductToCategory.categories(this.product_id, {
      limit: limit || 5,
      offset: offset || 0,
    });
  }
  async stores({ limit, offset }) {
    return await ProductToStore.stores(this.product_id, {
      limit: limit || 5,
      offset: offset || 0,
    });
  }
}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    model: {
      type: DataTypes.STRING(64),
    },
    location: {
      type: DataTypes.STRING(128),
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    stock_status_id: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: null,
      allowNull: true,
    },
    manufacturer_id: {
      type: DataTypes.INTEGER,
    },
    shipping: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(15, 4),
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
    viewed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "oc_product",
    timestamps: true,
    createdAt: "date_added",
    updatedAt: "date_modified",
  }
);

module.exports = Product;
