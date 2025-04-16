const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      // required: true,
    },
    // offerPercentage: {
    //   type: Number,
    //   required: true,
    // },
    productDetails: {
      type: String,
      required: true,
    },
    productImageURL: {
      type: String,
      required: true,
    },
    // productImageURL2: {
    //   type: String,
    // },
    // productImageURL3: {
    //   type: String,
    // },
    // quantity: {
    //   type: Number,
    //   required: true,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
