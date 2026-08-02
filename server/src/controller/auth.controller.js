const { fileUploader } = require('../config/cloudinary.js');
const fs = require('node:fs/promises');
const AppError = require('../utils/AppError.js');
const User = require('../model/user.model.js');
const { hashPassword } = require('../utils/Hashing.js');

const LoginController = async (request, response) => {
  try {
    const { email, password } = request.body;
  } catch (err) {}
};
const RegisterController = async (request, response) => {
  const { name, email, password } = request.body;
  const file = request.file;

  const existingUser = await User.findOne({ email });
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

  return response.status(201).json({
    success: true,
    data: {
      name: NewUser.name,
      id: NewUser._id,
      profilepic:NewUser.profilepic
    },
    message:"User Created Successfully"
  });
};
const CheckController = async (request, response) => {};

module.exports = { LoginController, RegisterController, CheckController };
