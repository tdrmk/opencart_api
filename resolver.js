const Product = require("./models/Product");
const Store = require("./models/Store");
const ProductDescription = require("./models/ProductDescription");
const Manufacturer = require("./models/Manufacturer");
const root = {
  products: async ({ offset, limit }) => {
    return await Product.findAll({ limit: limit || 5, offset: offset || 0 });
  },
  product: async ({ product_id }) => {
    return await Product.with_id(product_id);
  },
  stores: async () => {
    return await Store.findAll();
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
};

module.exports = root;
