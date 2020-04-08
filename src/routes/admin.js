const express = require('express')
const routes = express.Router()

const AdminController = require("../app/controllers/AdminController")

routes.get('/recipes', AdminController.recipes)
routes.get('/recipes/create', AdminController.recipeCreate)
routes.get('/recipes/:id', AdminController.recipeShow)
routes.get('/recipes/:id/edit', AdminController.recipeEdit)
routes.post('/recipes', AdminController.recipePost)
routes.put('/recipes', AdminController.recipePut)
routes.delete('/recipes', AdminController.recipeDelete)

routes.get('/chefs', AdminController.chefs)
routes.get('/chefs/create', AdminController.chefCreate)
routes.get('/chefs/:id', AdminController.chefShow)
routes.get('/chefs/:id/edit', AdminController.chefEdit)
routes.post('/chefs', AdminController.chefPost)
routes.put('/chefs', AdminController.chefPut)
routes.delete('/chefs', AdminController.chefDelete)


module.exports = routes
