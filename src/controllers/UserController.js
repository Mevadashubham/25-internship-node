require('dotenv').config();

const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const jwt = require("jsonwebtoken");
const sectret = process.env.SECRET;
const multer = require("multer");
const path = require("path");

const cloudinaryUtil = require("../utils/CloudanryUtil");


// Multer Setup
const storage = multer.diskStorage({
  destination: "./uploads", // temp storage
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage }).single("avatar");

// Controller to handle update with avatar
const updateUserWithAvatar = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "Upload error", err });

    try {
      const userId = req.params.id;

      let imageUrl = null;
      if (req.file) {
        const uploaded = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        imageUrl = uploaded.secure_url;
      }

      const updatedData = { ...req.body };
      if (imageUrl) updatedData.profileImageURL = imageUrl;

      const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });

      res.status(200).json({
        message: "Profile updated with avatar!",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Avatar upload error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};



const loginUser = async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;
  

  
  const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId")
  console.log(foundUserFromEmail);
  
  if (foundUserFromEmail != null) {
    
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
    
    if (isMatch == true) {
      res.status(200).json({
        message: "login success",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid cred..",
      });
    }
  } else {
    res.status(404).json({
      message: "Email not found..",
    });
  }
};

const signup = async (req, res) => {
 
  try {

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const createdUser = await userModel.create(req.body);


    //sending mail
    //  await mailUtil.sendingMail(createdUser.email, "Welcome to our website", "You have successfully signed up..");

    res.status(201).json({
      message: "user created..",
      data: createdUser,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const addUser = async (req, res) => {

  const savedUser = await userModel.create(req.body);
  res.json({
    message: "User Saved Successfully",
    data: savedUser,
  });
};
const getAllUsers = async (req, res) => {
  const users = await userModel.find().populate("roleId");
  res.json({
    message: "User fetched successfully..",
    data: users,
  });
};

const getUserById = async (req, res) => {
  const foundUser = await userModel.findById(req.params.id);
  res.json({
    message: "user fetched successfully..",
    data: foundUser,
  });
};

const deleteUserById = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "user deleted Successfully..",
    data: deletedUser,
  });
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email });
  if (foundUser){
const token = jwt.sign(foundUser.toObject(), sectret)
console.log(token);
const url = `http://localhost:5173/resetpassword/${token}`
const mailContent = `<html>
                      <a href="${url}">reset password</a>
                      <html>`

  const mailresponse = await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
  res.json({
    message: "mail sent to mail..",
    
  });
  }else{
    res.json({
      message: "user not found..",
    });
  }
}

const resetpassword = async (req, res) => {

const token = req.body.token;// decode --- email | id either
const newPassword = req.body.password;

const userFromToken = jwt.verify(token, sectret);

//encrypting password
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(newPassword, salt);

const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {password:hashedPassword,});
res.json({
  message:"password updated..",

})
}
// PUT /user/update/:id
const updateUser = async (req, res) => {
  try {
    const updated = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Profile updated", updatedUser: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};



module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signup,
  loginUser,
  forgotPassword,
  resetpassword,
  updateUser,
  updateUserWithAvatar,
 
};




