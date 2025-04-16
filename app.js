const express = require("express")//express
const mongoose = require("mongoose")
const cors = require("cors")
const ordersRoute = require("./src/routes/OrderRoutes")
//express object 
const app = express()
app.use(cors())
app.use(express.json())

//import role routes

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

//userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)


const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)


const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)


const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes)

const CategoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category",CategoryRoutes)

const SubCategoriesRoutes = require("./src/routes/SubCategoryRoutes")
app.use("/subCategory",SubCategoriesRoutes)

const ProductRoutes = require("./src/routes/ProductRoutes")
app.use("/product", ProductRoutes)

app.use('/api', ordersRoute);

mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
  console.log("database connected")
})



//server creation
const PORT = 3000
app.listen(PORT,()=>{
  console.log("server started on..",PORT)
})