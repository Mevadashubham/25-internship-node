const routes = require("express").Router();
const subCategoryController = require("../controllers/SubCategoriesController");

routes.post("/add", subCategoryController.addSubCategory);
routes.get("/getAllSubCategories", subCategoryController.getSubCategories);
routes.get("/:categoryId", subCategoryController.getSubCategoriesByCategoryId);

module.exports = routes;

