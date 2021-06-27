const jwt = require("jsonwebtoken");

module.exports = verifyUser = (req) => {
  try {
    req.email = null;

    const bearerToken =
      req.headers.auth && req.headers.auth.startWith("Bearer");
    if (bearerToken) {
      const token = bearerToken.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_KEY);
      req.email = payload.email;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
