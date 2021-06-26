const { users, tasks } = require("../constants/index");
const User = require("../dataBase/model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(({ id }) => id === id),
  },

  Mutation: {
    signup: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (user) throw new Error("Email already exits");

        const hassedPassword = await bcrypt.hash(input.password, 12);
        let newUser = new User({ ...input, password: hassedPassword });

        return await newUser.save();
      } catch (error) {
        throw error;
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) throw new Error("user not found");

        const comparePassword = await bcrypt.compare(input.password, user.password);
        if (!comparePassword) throw new Error("incorrect password");

        const secret = process.env.JWT_KEY;
        const token =  jwt.sign({ email: user.email }, secret, {
          expiresIn: "1d",
        });

        return { token };
      } catch (error) {
        throw error;
      }
    },
  },

  User: { tasks: ({ id }) => tasks.filter((task) => task.id === id) },
};
