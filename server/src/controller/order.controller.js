const Food = require('../model/food.model');
const Order = require('../model/order.model');
const AppError = require('../utils/AppError');
const { createOrderObject } = require('../utils/order.service');
const { mongoose } = require('mongoose');

const getAllAdmin = async (request, response) => {
  const result = await Order.find({}).populate('userDetails');
  response.status(200).json({
    success: true,
    message: 'All Order Fetched Successfully',
    data: result,
  });
};
const getAllUser = async (request, response) => {
  const token = request.token;
  const result = await Order.find({ userDetails: token.id }).populate(
    'userDetails'
  );
  response.status(200).json({
    success: true,
    message: 'All Order Fetched Successfully',
    data: result,
  });
};

const createOrder = async (request, response) => {
  const body = request.body;
  const token = request.token;

  const foodIds = body.cartItems.map((item) => item.itemId);
  const uniqueFoodIds = [...new Set(foodIds)];

  const foodObj = await Food.find({
    _id: {
      $in: uniqueFoodIds,
    },
    isAvailable: true,
  });

  // Check whether all requested foods exist and are available
  if (foodObj.length !== uniqueFoodIds.length) {
    throw new AppError('One or more food items are unavailable', 400);
  }

  const storeObj = createOrderObject(foodObj, body.cartItems);

  const cartValue = storeObj.reduce((total, item) => total + item.subtotal, 0);

  const newOrder = new Order({
    totalCartValue: cartValue,
    cartItems: storeObj,
    userDetails: token.id,
  });

  await newOrder.save();

  response.status(201).json({
    success: true,
    message: 'Order Created Successfully',
    data: newOrder,
  });
};
const UpdateOrderStatus = async (request, response) => {
  const { id } = request.params;
  const { status } = request.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid order ID', 400);
  }

  const order = await Order.findById(id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  if (order.status === 'cancelled') {
    throw new AppError('Cancelled orders cannot be updated', 400);
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      $set: {
        status,
      },
    },
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );

  return response.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    data: updatedOrder,
  });
};
const CancelOrderUser = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid order ID', 400);
  }

  const order = await Order.findById(id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Check ownership
  if (order.userDetails.toString() !== request.token.id.toString()) {
    throw new AppError('You are not allowed to cancel this order', 403);
  }

  // User can cancel only until preparing
  const cancellableStatuses = ['pending', 'accepted', 'preparing'];

  if (!cancellableStatuses.includes(order.status)) {
    throw new AppError(
      `Order cannot be cancelled when status is ${order.status}`,
      400
    );
  }

  order.status = 'cancelled';

  await order.save();

  return response.status(200).json({
    success: true,
    message: 'Order cancelled successfully',
    data: order,
  });
};
module.exports = {
  getAllAdmin,
  getAllUser,
  createOrder,
  UpdateOrderStatus,
  CancelOrderUser,
};
