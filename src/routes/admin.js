const express = require('express')
const routes = express.Router()

const AdminController = require("../app/controllers/AdminController")

routes.get('/recipes', AdminController.index)
routes.get('/recipes/create', AdminController.create)
routes.get('/recipes/:id', AdminController.show)
routes.get('/recipes/:id/edit', AdminController.edit)

routes.post('/recipes', AdminController.post)
routes.put('/recipes', AdminController.put)
routes.delete('/recipes', AdminController.delete)

module.exports = routes
