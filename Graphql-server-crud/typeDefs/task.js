const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    tasks: [Task!]
    task(id: ID!): Task!
  }

  extend type Mutation {
    createTask(input: createTaskInput!): Task
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User
  }

  input createTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
  }
`;

module.exports = typeDefs;
