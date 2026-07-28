const dotenv = require("dotenv/config");
const process = require("node:process");

dotenv();

const envs = {
  PORT: process.env.PORT || 2000,
  DBRUI: process.env.DBRUI || "",
  JWT: process.env.JWTSECRET || "HI",
};

module.exports = envs;
