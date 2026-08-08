const { verifyToken } = require('../utils/token.js');
const tokenValidate = async (request, response, next) => {
  const token = request.cookies?.token || '';

  if (!token) {
    return response.status(200).json({
      success: false,
      message: 'Token Not Found',
    });
  }

  const decodedToken = await verifyToken(token);

  request.token = decodedToken;

  next();
};

module.exports = tokenValidate;
