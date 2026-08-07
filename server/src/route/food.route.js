const { Router } = require('express');
const { getAll, saveFood } = require('../controller/food.controller');
const tokenValidate = require('../middleware/token.middleware');
const roleValidate = require('../middleware/role.middleware');
const { saveFood: saveFoodValidator } = require('../validation/food.validator');
const validate = require('../middleware/validate.middleware');
const upload = require('../utils/multer');

const router = Router();

// Public Routes

router.get('/getAll', tokenValidate, getAll);
router.post(
  '/create',
  tokenValidate,
  roleValidate(['admin', 'user']),
  upload.array('images'),
  validate(saveFoodValidator),
  saveFood
);
// router.post('/create', tokenValidate, roleValidate(['admin']), getAll);

// Admin Routes

module.exports = router;
