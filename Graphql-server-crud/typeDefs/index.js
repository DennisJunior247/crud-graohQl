const { gql } = require("apollo-server-express");
const tasksTypeDefs = require("./task");
const userTypeDefs = require("./user");

const typeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [typeDefs, userTypeDefs, tasksTypeDefs];
