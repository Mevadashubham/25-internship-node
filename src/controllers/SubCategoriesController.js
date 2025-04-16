const SubCategory = require("../models/SubCategoryModel");

const addSubCategory = async (req, res) => {
  try {

    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ message: "Name and categoryId are required" });
    }

    const subCategory = await SubCategory.create(req.body);
    res.status(201).json({
      message: "SubCategory added successfully",
      data: subCategory,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("categoryId");
    res.status(200).json({
      message: "All SubCategories",
      data: subCategories,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ categoryId: req.params.categoryId }).populate("categoryId");
    res.status(200).json({
      message: "SubCategories found",
      data: subCategories,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addSubCategory, getSubCategories, getSubCategoriesByCategoryId };
