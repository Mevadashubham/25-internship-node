const routes = require('express').Router();
const categoryController = require('../controllers/CategoryController');

routes.post('/add', categoryController.addCategory);
routes.get('/getAllCategories', categoryController.getCategory);


module.exports = routes;