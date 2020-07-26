const Product = require("./models/Product");
const Store = require("./models/Store");
const ProductDescription = require("./models/ProductDescription");
const Manufacturer = require("./models/Manufacturer");
const Category = require("./models/Category");
const CategoryDescription = require("./models/CategoryDescription");
const ProductToCategory = require("./models/ProductToCategory");

const root = {
  products: async ({ offset, limit, category_id }) => {
    if (category_id) {
      return await ProductToCategory.products(category_id, {
        limit: limit || 5,
        offset: offset || 0,
      });
    }
    return await Product.findAll({ limit: limit || 5, offset: offset || 0 });
  },
  total_products: async ({ category_id }) => {
    if (category_id) {
      return await ProductToCategory.count({
        where: {
          category_id,
        },
      });
    }
    return await Product.count();
  },
  product: async ({ product_id }) => {
    return await Product.with_id(product_id);
  },
  stores: async ({ offset, limit }) => {
    return await Store.findAll({ limit: limit || 5, offset: offset || 0 });
  },
  store: async ({ store_id }) => {
    return await Store.with_id(store_id);
  },
  product_description: async ({ product_id }) => {
    return await ProductDescription.with_id(product_id);
  },
  manufacturer: async ({ manufacturer_id }) => {
    return await Manufacturer.with_id(manufacturer_id);
  },
  manufacturers: async ({ offset, limit }) => {
    return await Manufacturer.findAll({
      limit: limit || 5,
      offset: offset || 0,
    });
  },
  categories: async ({ offset, limit, top, parent_id }) => {
    return await Category.findAll({
      limit: limit || 5,
      offset: offset || 0,
      where: {
        ...(top && { top }),
        ...(parent_id && { parent_id }),
      },
    });
  },
  total_categories: async ({ top, parent_id }) => {
    return await Category.count({
      where: {
        ...(top && { top }),
        ...(parent_id && { parent_id }),
      },
    });
  },
  category: async ({ category_id }) => {
    return await Category.with_id(category_id);
  },
  category_description: async ({ category_id }) => {
    return await CategoryDescription.with_id(category_id);
  },
};

module.exports = root;
