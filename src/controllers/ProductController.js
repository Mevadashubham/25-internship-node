const productModel = require("../models/ProductModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudanryUtil");


// Set storage engine
const storage = multer.diskStorage({
  // destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer object
const upload = multer({
  storage: storage,
}).single("image");


// Add a new product
const addProduct = async (req, res) => {
  try {
    const savedProduct = await productModel.create(req.body);
    res.status(201).json({
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new product with image
const addProductWithImage = async (req, res) => {

  upload(req, res, async (err) => {
      if (err) {
          return res.status(500).json({ message: err.message });
      }
      else {

        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        console.log(cloudinaryResponse);
        console.log(req.body);


          const product = await productModel.create({
              name: req.body.name,
              price: req.body.price,
              offerPrice: req.body.offerPrice,
              categoryId: req.body.categoryId, // Corrected field name
              subCategoryId: req.body.subCategoryId, // Corrected field name
              vendorId: req.body.vendor_id, // Corrected field name
              productImageURL: cloudinaryResponse.secure_url,
              productDetails : req.body.productDetails
          });


          return res.status(201).json({
              message: "Product added successfully",
              data: cloudinaryResponse,
          });
      }
  });
};


// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("categoryId")
      .populate("subCategoryId")

    res.status(200).json({
      message: "All Products",
      data: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
   console.log("Fetching product with ID:", req.params.id); // Debugging line
    const product = await productModel.findById(req.params.id).populate("categoryId subCategoryId");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product found",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
      const products = await productModel.find({ categoryId: req.params.categoryId }).populate("categoryId");
      res.status(200).json({
          message: "Products by category",
          data: products,
      });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// Get products by subcategory
const getProductsBySubCategory = async (req, res) => {
  try {
      const products = await productModel.find({ subCategoryId: req.params.subCategoryId }).populate("subCategoryId");
      res.status(200).json({
          message: "Products by subcategory",
          data: products,
      });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};


// Update a product by ID old code
// const updateProduct = async (req, res) => {
//   try {
//     const updatedProduct = await productModel.findByIdAndUpdate(
//       req.params.productId,
//       req.body,
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({
//       message: "Product updated successfully",
//       data: updatedProduct,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a product by ID new code
const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle image upload
    if (req.file) {
      // Delete old image from Cloudinary (optional)
      if (product.productImageURL) {
        const oldImagePublicId = product.productImageURL.split('/').pop().split('.')[0]; // Extract public_id
        await cloudinaryUtil.deleteFileFromCloudinary(oldImagePublicId);
      }

      // Upload new image to Cloudinary
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      req.body.productImageURL = cloudinaryResponse.secure_url; // Update image URL in product data
    } else {
      // If no new image, keep the existing one
      req.body.productImageURL = product.productImageURL;
    }

    // Update the product with new data
    const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addProduct, getProducts, getProductById, getProductsByCategory, getProductsBySubCategory, updateProduct, deleteProduct, addProductWithImage};

