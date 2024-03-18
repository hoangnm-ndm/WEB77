import bcryptjs from "bcryptjs";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    /**
     * 1. Validate request body
     * 2. Check if email is already in use
     * 3. Hash password
     * 4. Create user - save to database
     */

    const { email, password } = req.body;

    // 2. Check if email is already in use
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email is already in use",
      });
    }

    // 3. Hash password
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // 4. Create user - save to database
    const user = await User.create({
      email,
      password: hashPassword,
    });

    user.password = undefined;
    return res.status(201).json({
      message: "Register successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
