const sequelize = require("../config/database");
const { DataTypes, Model } = require("sequelize");

class ProductDescription extends Model {}

ProductDescription.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    language_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING(255),
    description: DataTypes.TEXT,
    meta_title: DataTypes.STRING(255),
  },
  {
    sequelize,
    modelName: "ProductDescription",
    tableName: "oc_product_description",
    timestamps: false,
  }
);

module.exports = ProductDescription;
