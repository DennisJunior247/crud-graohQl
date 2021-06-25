const uuid = require("uuid");
const { tasks, users } = require("../constants/index");

module.exports = {
  Query: {
    tasks: () => tasks,
    task: (_, { id }) => tasks.find(({ id }) => id === id),
  },

  Mutation: {
    createTask: (_, { input }) => {
      const task = { id: 3, ...input };
      return tasks.push(task);
    },
  },
  Task: { user: ({ userId }) => users.find((user) => user.id === userId) },
};
