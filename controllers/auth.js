import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { TOKEN_SECRET } = process.env;

export const register = async (req, res, next) => {
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

    // Cach 1:
    const user = await User.create({
      email,
      password: hashPassword,
    });

    // Cach 2:
    // const user = new User({ email, password: hashPassword });
    // await user.save();

    user.password = undefined;
    return res.status(201).json({
      message: "Register successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    /**
     * 1. Validate request body
     * 2. Check if email exists
     * 3. Compare password
     * 4. Generate token
     * 5. Response token, user info
     */
    const { email, password } = req.body;
    // 2. Check user exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        message: "Email is not found",
      });
    }

    // 3. Compare password
    const validPassword = await bcryptjs.compare(password, userExist.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    // 4. Generate token
    const token = jwt.sign({ _id: userExist._id }, TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // 5. Response token, user info
    userExist.password = undefined;
    return res.status(200).json({
      message: "Login successfully!",
      token,
      user: userExist,
    });
  } catch (error) {
    next(error);
  }
};
