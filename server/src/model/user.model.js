const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
      lowercase: [true],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, 'Email Already Exist'],
      required: [true, 'Email is Required'],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model('User', userSchema);

module.exports = user;
