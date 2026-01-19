const express = require("express"); //express
const mongoose = require("mongoose");
const cors = require("cors");
import dotenv from "dotenv";
const ordersRoute = require("./src/routes/OrderRoutes");
//express object

console.log(" BACKEND STARTED - CORS TEST ACTIVE");
dotenv.config();

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());

//import role routes

const roleRoutes = require("./src/routes/RoleRoutes");
app.use(roleRoutes);

//userRoutes
const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

const stateRoutes = require("./src/routes/StateRoutes");
app.use("/state", stateRoutes);

const cityRoutes = require("./src/routes/CityRoutes");
app.use("/city", cityRoutes);

const areaRoutes = require("./src/routes/AreaRoutes");
app.use("/area", areaRoutes);

const CategoryRoutes = require("./src/routes/CategoryRoutes");
app.use("/category", CategoryRoutes);

const SubCategoriesRoutes = require("./src/routes/SubCategoryRoutes");
app.use("/subCategory", SubCategoriesRoutes);

const ProductRoutes = require("./src/routes/ProductRoutes");
app.use("/product", ProductRoutes);

app.use("/api", ordersRoute);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

//server creation
const PORT = 3000;
app.listen(PORT, () => {
  console.log("server started on..", PORT);
});
