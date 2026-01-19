
const routes = require("express").Router()

const userController = require("../controllers/UserController")

routes.post("/user",userController.signup)
routes.get("/users",userController.getAllUsers)
routes.get("/user/:id",userController.getUserById)
routes.delete("/user/:id",userController.deleteUserById)
routes.post("/user/login",userController.loginUser)
routes.post("/user/forgotpassword",userController.forgotPassword)
routes.post("/user/resetpassword",userController.resetpassword)
routes.get('/getuser/:id', userController.getUserById);
routes.put('/update/:id', userController.updateUser);
routes.put("/updateWithAvatar/:id", userController.updateUserWithAvatar);

module.exports = routes