const validate = (schema) => {
  return (req, res, next) => {
    try {
      console.log(req.body);
      const result = schema.safeParse(req.body);
      console.log(result);
      if (!result.success) {
        const errors = {};

        result.error.issues.forEach((issue) => {
          errors[issue.path.join('.')] = issue.message;
        });

        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors,
        });
      }

      // Replace body with validated data
      req.body = result.data;

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validate;
