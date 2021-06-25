const uuid = require("uuid");
const { users, tasks } = require("../constants/index");

module.exports = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(({ id }) => id === id),
  },

  Mutation: {},

  User: { tasks: ({ id }) => tasks.filter((task) => task.id === id) },
};
