const Product = require("./models/Product");
const Store = require("./models/Store");
const ProductDescription = require("./models/ProductDescription");
const root = {
  products: async ({ offset, limit }) => {
    return await Product.findAll({ limit: limit || 5, offset: offset || 0 });
  },
  product: async ({ product_id }) => {
    return await Product.findOne({
      where: {
        product_id,
      },
    });
  },
  stores: async () => {
    return await Store.findAll();
  },
  store: async ({ store_id }) => {
    return await Store.findOne({
      where: {
        store_id,
      },
    });
  },
  product_description: async ({ product_id }) => {
    return await ProductDescription.findOne({
      where: {
        product_id,
      },
    });
  },
};

module.exports = root;
