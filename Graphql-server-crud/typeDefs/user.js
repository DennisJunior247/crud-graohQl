const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User!
  }

  extend type Mutation {
    signup(input: signupInput): User
    login(input: loginInput): Token
  }
  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]
  }
  type Token {
    token: String!  
  }
  input signupInput {
    name: String
    email: String
    password: String
  }
  input loginInput {
    email: String
    password: String
  }
`;

module.exports = typeDefs;
