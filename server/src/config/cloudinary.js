const cloudinary = require('cloudinary').v2;
const env = require('./env.js');

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_SECRET,
});

const fileUploader = async (filePath, folderPath) => {
  try {
    return await cloudinary.uploader.upload(filePath, {
      resource_type: 'image',
      folder: folderPath,
    });
  } catch (err) {
    console.log('Found Error', err);
  }
};

const fileDeletion = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id, {
    invalidate: true,
    resource_type: 'image',
  });
};

module.exports = { fileUploader, fileDeletion };
