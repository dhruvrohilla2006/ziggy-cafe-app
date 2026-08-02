const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const genSalt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, genSalt);
};
const comparePassword = async (password, hashPass) => {
  return await bcrypt.compare(password, hashPass);
};

module.exports = { hashPassword, comparePassword };
