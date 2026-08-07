const { fileUploader } = require('../config/cloudinary.js');
const Food = require('../model/food.model.js');
const AppError = require('../utils/AppError.js');

const getAll = async (request, response) => {
  const Record = await Food.find({}).sort({ name: 1 });

  if (Record?.length == 0) {
    throw new AppError('No Record Found', 404);
  }

  return response.status(200).json({
    success: true,
    message: 'Record Fetched Successfully',
    data: Record,
  });
};

const saveFood = async (request, response) => {
  const data = request.body;
  const files = request.files;

  const imageUrls = await Promise.all(
    files.map((imageObj) => {
      return fileUploader(imageObj.path).then((value) => value.secure_url);
    })
  );

  data.images = imageUrls;

  if (!data) {
    throw new AppError('Requested Data Not Found', 400);
  }

  const record = await Food.insertOne(data);

  return response.status(200).json({
    success: true,
    message: 'Saved Successfully',
    data: record,
  });
};

module.exports = {
  getAll,
  saveFood,
};
