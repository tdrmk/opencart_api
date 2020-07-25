const { buildSchema } = require("graphql");

// TODO: Incorporate language ID in queries.
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
    date_added: String
    date_modified: String
    product_description: ProductDescription
    manufacturer: Manufacturer
    stores(offset: Int, limit: Int): [Store]
  }

  type Store {
    store_id: Int!
    name: String
    url: String
    ssl: String
    manufacturers(offset: Int, limit: Int): [Manufacturer]
    products(offset: Int, limit: Int): [Product]
  }

  type ProductDescription {
    product_id: Int!
    language_id: Int!
    name: String
    description: String
    meta_title: String
  }

  type Manufacturer {
    manufacturer_id: Int!
    name: String
    image: String
    sort_order: Int
    stores(offset: Int, limit: Int): [Store]
  }

  type ManufacturerToStore {
    manufacturer_id: Int!
    store_id: Int!
  }

  type Category {
    category_id: Int!
    image: String
    parent_id: Int
    top: Boolean
    column: Int
    sort_order: Int
    status: Boolean
    date_added: String
    date_modified: String
    category_description: CategoryDescription
  }
  type CategoryDescription {
    category_id: Int!
    language_id: Int!
    name: String
    description: String
    meta_title: String
  }

  type ProductToStore {
    product_id: Int!,
    store_id: Int!,
  }

  type Query {
    products(offset: Int, limit: Int): [Product]
    product(product_id: Int!): Product
    product_description(product_id: Int!): ProductDescription
    stores(offset: Int, limit: Int): [Store]
    store(store_id: Int!): Store
    manufacturer(manufacturer_id: Int!): Manufacturer
    manufacturers(offset: Int, limit: Int): [Manufacturer]
    category(category_id: Int!): Category
    categories(offset: Int, limit: Int): [Category]
    category_description(category_id: Int!): CategoryDescription
  }
`);

module.exports = schema;
