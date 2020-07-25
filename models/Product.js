const sequelize = require("../config/database");
const { DataTypes, Model } = require("sequelize");
const ProductDescription = require("./ProductDescription");

class Product extends Model {
  async product_description() {
    return await ProductDescription.findOne({
      where: {
        product_id: this.product_id,
      },
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
