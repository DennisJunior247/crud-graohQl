module.exports.isAuthenticated = (_, _, { email }) => {
  if (!email) {
    throw Error("Acess denied!,Please login");
  }
};
