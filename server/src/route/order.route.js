const { Router } = require('express');
const tokenValidate = require('../middleware/token.middleware');
const roleValidate = require('../middleware/role.middleware');
const {
  getAllAdmin,
  getAllUser,
  createOrder,
  UpdateOrderStatus,
  CancelOrderUser,
} = require('../controller/order.controller');
const validate = require('../middleware/validate.middleware');
const {
  CreateOrder,
  updateOrderStatusSchema,
} = require('../validation/order.validator');

const router = Router();

// Get All Orders for admin  /getAllAdmin

router.get('/getAllAdmin', tokenValidate, roleValidate(['admin']), getAllAdmin);

// Get All Order of User for user /getAllUser

router.get(
  '/getAllUser',
  tokenValidate,
  roleValidate(['admin', 'user']),
  getAllUser
);

// Create Order for user  /create/order

router.post(
  '/create',
  tokenValidate,
  roleValidate(['admin', 'user']),
  validate(CreateOrder),
  createOrder
);

// Cancel the or  der from userSide /status/:orderId/CancelUser

router.get(
  '/status/CancelUser/:id',
  tokenValidate,
  roleValidate(['admin', 'user']),
  CancelOrderUser
);
// Update the Status of the order /status/:orderId

router.patch(
  '/status/:id',
  tokenValidate,
  roleValidate(['admin', 'user']),
  validate(updateOrderStatusSchema),
  UpdateOrderStatus
);

module.exports = router;
