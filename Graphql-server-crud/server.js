const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

// bodypaser//
app.use(express.json());

//cors//
app.use(cors());

// graphql server//
const typeDefs = gql`
  type Query {
    greetings: String
  }
`;
const resolvers = {};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

// middlware//
app.use("/", (req, res, next) => res.send("hello"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`port listening at ${port}`);
  console.log(`gql endpoint listening at /graphql`);
});
    