const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const dotenv = require("dotenv");
const cors = require("cors");

const resolvers = require("./resover");
const typeDefs = require("./typeDefs");
const dbConnection = require("./dataBase/db");

const app = express();
dotenv.config();

// bodypaser//
app.use(express.json());

//cors//
app.use(cors());

// routes//
app.use("/", (req, res, next) => res.send("hello"));

//connecting to db//
dbConnection();

//setting up apollo server with graphql//
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

//connecting to localhost//
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`port listening at ${port}`);
  console.log(`gql endpoint listening at /graphql`);
});
