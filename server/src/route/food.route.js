const { Router } = require('express');
const {
  getAll,
  saveFood,
  updateFood,
  getOne,
  deleteOne,
} = require('../controller/food.controller');
const tokenValidate = require('../middleware/token.middleware');
const roleValidate = require('../middleware/role.middleware');
const {
  saveFood: saveFoodValidator,
  updateFood: updateFoodValidator,
} = require('../validation/food.validator');
const validate = require('../middleware/validate.middleware');
const upload = require('../utils/multer');

const router = Router();

// Public Routes

router.get('/getAll', tokenValidate, getAll);
router.post(
  '/create',
  tokenValidate,
  roleValidate(['admin']),
  upload.array('images'),
  validate(saveFoodValidator),
  saveFood
);
router.put(
  '/update/:id',
  tokenValidate,
  roleValidate(['admin']),
  validate(updateFoodValidator),
  updateFood
);
router.get(
  '/getOne/:id',
  tokenValidate,
  roleValidate(['admin', 'user']),
  getOne
);
router.delete('/deleteOne/:id', tokenValidate, roleValidate(['admin']), deleteOne);

// Admin Routes

module.exports = router;
