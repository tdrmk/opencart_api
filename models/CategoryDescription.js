const sequelize = require("../config/database");
const { DataTypes, Model } = require("sequelize");

class CategoryDescription extends Model {
  static async with_id(category_id) {
    return await CategoryDescription.findOne({
      where: {
        category_id,
      },
    });
  }
}

CategoryDescription.init(
  {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING(255),
    description: DataTypes.TEXT,
    meta_title: DataTypes.STRING(255),
  },
  {
    sequelize,
    modelName: "CategoryDescription",
    tableName: "oc_category_description",
    timestamps: false,
  }
);

module.exports = CategoryDescription;
