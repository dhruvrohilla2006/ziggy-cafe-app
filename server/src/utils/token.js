const jwt = require('jsonwebtoken');
const env = require('../config/env.js');

const genToken = async (payload) => {
  const token = jwt.sign(payload, env.JWT, {
    expiresIn: '1d',
  });
  return token;
};

const verifyToken = async (token) => {
  const decodedToken = jwt.verify(token, env.JWT);

  return decodedToken;
};

module.exports = { genToken, verifyToken };
