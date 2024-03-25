import Product from "../models/Product.js";
import { validBody } from "../utils/validBody.js";
import { productSchema } from "../validations/product.js";

export const createProduct = async (req, res, next) => {
  try {
    // Validation
    validBody(req.body, productSchema);
    const data = await Product.create(req.body);
    if (data) {
      return res.status(201).json({
        message: "Create product successfully",
        data,
      });
    }
    return res.status(500).json({
      message: "Create product failed",
    });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const data = await Product.find({});
    if (data) {
      return res.status(201).json({
        message: "Get product successfully",
        data,
      });
    }
    return res.status(500).json({
      message: "Get product failed",
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id);
    if (data) {
      return res.status(201).json({
        message: "Get product successfully",
        data,
      });
    }
    return res.status(500).json({
      message: "Get product failed",
    });
  } catch (error) {
    next(error);
  }
};

// ! Xoá cứng
export const removeProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    console.log(data);
    if (data) {
      return res.status(200).json({
        message: "Remove product successfully",
        data,
      });
    }
    return res.status(400).json({
      message: "Remove product failed",
    });
  } catch (error) {
    next(error);
  }
};

// ! Xoá mềm
export const softRemoveProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(
      req.params.id,
      {
        hide: true,
      },
      { new: true }
    );
    if (data) {
      return res.status(200).json({
        message: "Remove product successfully!",
        data,
      });
    }
    return res.status(400).json({
      message: "Remove product failed!",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    validBody(req.body, productSchema);
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (data) {
      return res.status(200).json({
        message: "Update product successfully!",
        data,
      });
    }
    return res.status(400).json({
      message: "Update product failed!",
    });
  } catch (error) {
    next(error);
  }
};
