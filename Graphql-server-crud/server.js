const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const dotenv = require("dotenv");
const cors = require("cors");

const { tasks, users } = require("./constants/index");

const app = express();
dotenv.config();

// bodypaser//
app.use(express.json());

//cors//
app.use(cors());

// graphql server//
const typeDefs = gql`
  type Query {
    tasks: [Task!]
    task(id: ID!): Task!
    users: [User!]
    user(id: ID!): User!
  }
  type Mutation {
    createTask(input: createTaskInput): Task
  }

  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]
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

const resolvers = {
  Query: {
    tasks: () => tasks,
    task: (_, { id }) => tasks.find(({ id }) => id === id),
    users: () => users,
    user: (_, { id }) => users.find(({ id }) => id === id),
  },

  Mutation: {
    createTask: (_, { input }) => tasks.push({ ...input, id: 4 }),
  },
  Task: { user: ({ userId }) => users.find((user) => user.id === userId) },
  User: { tasks: ({ id }) => tasks.filter((task) => task.id === id) },
};

//setting up apollo server with graphql//
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

// routes//
app.use("/", (req, res, next) => res.send("hello"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`port listening at ${port}`);
  console.log(`gql endpoint listening at /graphql`);
});
