const mongoose = require("mongoose");

module.exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Mongodb connection error: ", error);
  }
};
