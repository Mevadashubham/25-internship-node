require("dotenv").config();
const express = require("express"); //express
const mongoose = require("mongoose");
const cors = require("cors");

const ordersRoute = require("./src/routes/OrderRoutes");
//express object

console.log(" BACKEND STARTED - CORS TEST ACTIVE");

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    "https://innovative-product.vercel.app",
    "https://innovative-product-frontend.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

// Apply CORS middleware FIRST - before any routes
app.use(cors(corsOptions));

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
