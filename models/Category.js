const sequelize = require("../config/database");
const { DataTypes, Model } = require("sequelize");
const CategoryDescription = require("./CategoryDescription");

class Category extends Model {
  static async with_id(category_id) {
    return await Category.findOne({
      where: {
        category_id,
      },
    });
  }
  async category_description() {
    return await CategoryDescription.with_id(this.category_id);
  }
}

Category.init(
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    top: DataTypes.TINYINT(1),
    column: DataTypes.INTEGER,
    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: DataTypes.TINYINT(1),
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "oc_category",
    timestamps: true,
    createdAt: "date_added",
    updatedAt: "date_modified",
  }
);

module.exports = Category;
