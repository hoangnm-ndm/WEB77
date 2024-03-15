import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    // Validation
    if (!name || !price || !description) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }
    const data = await Product.create({ name, price, description });
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
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
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
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
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
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// ! Xoá cứng
export const removeProductById = async (req, res) => {
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
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

// ! Xoá mềm
export const softRemoveProductById = async (req, res) => {
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
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
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
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
