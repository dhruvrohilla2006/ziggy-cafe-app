const AppError = require('../utils/AppError.js');
const {verifyToken} = require('../utils/token.js')
const tokenValidate = async (request, response, next) => {
  token = request.cookies?.token || "";

  if (!token) {
    throw new AppError("Token Not Found", 400);
  } 
  
  const decodedToken = await verifyToken(token);

  request.token = decodedToken;

  next();
  
}

module.exports = tokenValidate