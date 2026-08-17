const { fileUploader, fileDeletion } = require('../config/cloudinary.js');
const Food = require('../model/food.model.js');
const AppError = require('../utils/AppError.js');
const mongoose = require('mongoose');

const getAll = async (request, response) => {
  // Return empty array with 200 OK if no records exist
  const records = await Food.find({}).sort({ name: 1 });

  return response.status(200).json({
    success: true,
    message: 'Records Fetched Successfully',
    count: records.length,
    data: records,
  });
};

const saveFood = async (request, response) => {
  const data = request.body;
  const files = request.files || [];

  if (!data || Object.keys(data).length === 0) {
    throw new AppError('Request body cannot be empty', 400);
  }

  // Handle uploaded images cleanly
  if (files.length > 0) {
    const uploadPromises = files.map((file) => fileUploader(file.path));
    const uploadResults = await Promise.all(uploadPromises);

    // Save both URL and public_id for easy deletion later
    data.images = uploadResults.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));
  }

  const record = await Food.create(data);

  return response.status(201).json({
    success: true,
    message: 'Record Saved Successfully',
    data: record,
  });
};

// UPDATE RECORD
const updateFood = async (request, response) => {
  const { id } = request.params;
  const updateData = request.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid Record ID', 400);
  }

  const updatedRecord = await Food.findByIdAndUpdate(id, updateData, {
    returnDocument: 'after', // Returns the modified document
    runValidators: true, // Ensures updates adhere to schema rules
  });

  if (!updatedRecord) {
    throw new AppError('Record Not Found', 404);
  }

  return response.status(200).json({
    success: true,
    message: 'Record Updated Successfully',
    data: updatedRecord,
  });
};
const getOne = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid Record ID', 400);
  }

  const record = await Food.findById(id);

  if (!record) {
    throw new AppError('Record Not Found', 404);
  }

  return response.status(200).json({
    success: true,
    message: 'Record Fetched Successfully',
    data: record,
  });
};

const deleteOne = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Bad Request', 400);
  }

  const record = await Food.findById(id);
  if (!record) {
    throw new AppError('Record Not Found', 404);
  }

  // 3. Delete associated images safely
  if (record.images && record.images.length > 0) {
    const deleteResults = await Promise.allSettled(
      record.images.map((obj) => {
        // Fallback robust extraction (or preferably use image.public_id if stored)
        const publicId = obj.public_id;
        return fileDeletion(publicId);
      })
    );

    const hasFailedDeletions = deleteResults.some(
      (res) => res.status === 'rejected' || res.value?.result !== 'ok'
    );

    if (hasFailedDeletions) {
      throw new AppError('Problem occurred while deleting record images', 500);
    }
  }

  // 4. Delete DB record only after files are successfully cleaned up
  await record.deleteOne();

  return response.status(200).json({
    success: true,
    message: 'Record Deleted Successfully',
    data: record,
  });
};

module.exports = {
  deleteOne,
  getAll,
  saveFood,
  updateFood,
  getOne,
};
