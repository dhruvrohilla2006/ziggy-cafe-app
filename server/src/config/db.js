const mongoose = require("mongoose");
const env = require("./env.js");
const process = require("node:process");
const connectDB = async () => {
  try {
    await mongoose.connect(env.DBRUI, {
      dbName: "restaurant_db",
    });
    console.log("DB Connected SuccessFully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
