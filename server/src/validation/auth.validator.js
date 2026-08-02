const z = require('zod');

const loginSchema = z.object({
  email: z.string('Must be String').email('Email Must Be String').toLowerCase(),
  password: z
    .string('Must be String')
    .trim()
    .min(6, 'Minimum Length For Password is 6 Character')
    .max(12, 'Maximum Length for a password is 12'),
});

const registerSchema = z.object({
  name: z.string().trim().min(5).max(40).toLowerCase(),
  email: z.string('Must be String').email('Email Must Be String').toLowerCase(),
  password: z
    .string('Must be String')
    .trim()
    .min(6, 'Minimum Length For Password is 6 Character')
    .max(12, 'Maximum Length for a password is 12'),
});

module.exports = { loginSchema, registerSchema };
