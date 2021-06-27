const { skip } = require("graphql-resolvers");

module.exports.isAuthenticated = (_, __, { email }) => {
  if (!email) {
    throw new Error("Acess denied!,Please login");
  }
  return skip;
};
