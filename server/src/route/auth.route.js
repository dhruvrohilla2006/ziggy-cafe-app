const { Router } = require('express');
const {
  LoginController,
  RegisterController,
  CheckController,
} = require('../controller/auth.controller.js');
const validate = require('../middleware/validate.middleware.js');
const {
  loginSchema,
  registerSchema,
} = require('../validation/auth.validator.js');
const upload = require('../utils/multer.js');
const router = Router();

router.post('/login', validate(loginSchema), LoginController);
router.post(
  '/register',
  upload.single('profilepic'),
  validate(registerSchema),
  RegisterController
);
router.post('/check', CheckController);

module.exports = router;
