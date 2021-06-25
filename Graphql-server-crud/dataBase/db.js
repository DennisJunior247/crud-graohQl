const mongoose = require("mongoose");

module.exports = async () => {
  try {
    mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`db connected to ${process.env.DB}`);
  } catch (error) {
    console.log(error.message);
  }
};
