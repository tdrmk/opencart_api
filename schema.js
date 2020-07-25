const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Product {
    product_id: Int!
    model: String
    location: String
    quantity: Int
    stock_status_id: Int
    image: String
    manufacturer_id: Int
    shipping: Boolean
    price: Float
    status: Boolean
    viewed: Int
    product_description: ProductDescription
  }

  type Store {
    store_id: Int!
    name: String
    url: String
    ssl: String
  }

  type ProductDescription {
    product_id: Int!,
    language_id: Int,
    name: String,
    description: String,
    meta_title: String,
  }

  type Query {
    products(offset: Int, limit: Int): [Product]
    product(product_id: Int!): Product
    stores: [Store]
    store(store_id: Int!): Store
    product_description(product_id: Int!): ProductDescription
  }
`);

module.exports = schema;
