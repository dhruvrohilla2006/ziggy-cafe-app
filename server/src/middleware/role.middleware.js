const AppError = require('../utils/AppError');

const roleValidate = (allowedRole) => {
  return (request, response, next) => {
    const token = request.token;

    if (!token) {
      return response.status(200).json({
        success: true,
        message: 'Token Not Found',
      });
    }
    console.log(allowedRole.includes(token.role));
    if (!allowedRole.includes(token.role)) {
      throw new AppError('Unauthorize user not allowed!', 401);
    }

    next();
  };
};

module.exports = roleValidate;
