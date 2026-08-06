const { fileUploader } = require('../config/cloudinary.js');
const fs = require('node:fs/promises');
const AppError = require('../utils/AppError.js');
const User = require('../model/user.model.js');
const { hashPassword, comparePassword } = require('../utils/Hashing.js');
const { genToken } = require('../utils/token.js');


const LoginController = async (request, response) => {
  const { email, password } = request.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new AppError("User With this Email Doesn't Exist", 404);
  }

  if (!comparePassword(password, existingUser.password)) {
    throw new AppError('Wrong Credentials', 401);
  }
  const token = await genToken({
    name: existingUser.name,
    id: existingUser._id,
    role: existingUser.role,
  });

  response.cookie('token', token, {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    sameSite: 'lax',
  });

  response.status(200).json({
    success: true,
    message: 'User Login SuccessFully',
  });
};
const RegisterController = async (request, response) => {
  const { name, email, password } = request.body;
  const file = request.file;

  const existingUser = await User.findOne({
    email,
  });
  if (existingUser) {
    await fs.unlink(file.path, (err) => {
      if (err) throw err;
      console.log('File deleted successfully');
    });
    throw new AppError('User With This Email Already Exists', 409);
  }

  const passwordHash = await hashPassword(password);

  const fileUrls = await fileUploader(file.path, 'profile-pic');

  await fs.unlink(file.path, (err) => {
    if (err) throw err;
    console.log('File deleted successfully');
  });

  const NewUser = new User();

  NewUser.name = name;
  NewUser.email = email;
  NewUser.password = passwordHash;
  NewUser.profilepic = fileUrls?.secure_url;

  await NewUser.save();

  const token = await genToken({
    name: NewUser.name,
    id: NewUser._id,
    role: NewUser.role,
  });

  response.cookie('token', token, {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    sameSite: 'lax',
  });

  return response.status(201).json({
    success: true,
    data: {
      name: NewUser.name,
      id: NewUser._id,
      profilepic: NewUser.profilepic,
    },
    message: 'User Created Successfully',
  });
};
const CheckController = async (request, response) => {
  const token = request.token || '';

  if (!token) {
    throw new AppError('Token Not Found', 400);
  }

  response.status(200).json({
    success: true,
    message: 'User Authenticated Successfully',
    user: {
      ...token,
    },
  });
};
const LogoutController = async (request, response) => {
  response.clearCookie('token');
  response.status(200).json({
    success: true,
    message: 'Logout Sucessful',
  });
};

module.exports = {
  LoginController,
  RegisterController,
  CheckController,
  LogoutController,
};
