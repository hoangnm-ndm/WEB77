import { registerSchema } from "../validations/auth.js";

export const validateRegister = (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
