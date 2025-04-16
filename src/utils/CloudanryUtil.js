require("dotenv").config();
const cloundinary = require("cloudinary").v2;


const uploadFileToCloudinary = async (file) => {

    // conif
        cloundinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });

    const cloundinaryResponse = await cloundinary.uploader.upload(file.path);
    return cloundinaryResponse;


};
const deleteFileFromCloudinary = async (publicId) => {
    try {
      const result = await cloundinary.uploader.destroy(publicId);
      console.log("Cloudinary deletion result:", result);
      
      // Check if deletion was successful
      if (result.result === "ok") {
        return { success: true, message: "Image deleted successfully from Cloudinary" };
      } else {
        return { success: false, message: "Failed to delete image from Cloudinary" };
      }
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      return { success: false, error: error.message };
    }
  };


module.exports = {
    uploadFileToCloudinary,
    deleteFileFromCloudinary
}

