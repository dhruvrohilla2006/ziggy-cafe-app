const dotenv = require('dotenv');
const process = require('node:process');

dotenv.configDotenv();

const envs = {
  PORT: process.env.PORT || 2000,
  DBRUI: process.env.DBURI || '',
  JWT: process.env.JWTSECRET,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
};

module.exports = envs;
