"use strict";
const express = require("express");
const app = express();
const process = require("node:process");
const env = require("./config/env.js");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");

app.use(
  express.json({
    strict: true,
  }),
);
app.use(cookieParser());

async function server() {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      console.log(`Server started at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
server();
