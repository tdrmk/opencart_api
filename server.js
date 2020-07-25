const express = require("express");

const { graphqlHTTP } = require("express-graphql");
const root = require("./resolver");
const schema = require("./schema");

// db.authenticate()
//   .then(() => console.log("Successfully connected.."))
//   .catch((err) => `Error: ${err}`);

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
