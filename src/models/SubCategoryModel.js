const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true, // Make name required
            
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);