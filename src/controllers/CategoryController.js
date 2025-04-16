const Category = require("../models/CategoryModel");

const addCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body); // Use a different variable name
        res.status(201).json({
            message: "Category added successfully",
            data: newCategory, // Correct variable name
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: "All Categories",
            data: categories,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addCategory, getCategory };
