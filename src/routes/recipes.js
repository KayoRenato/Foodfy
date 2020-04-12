const express = require('express')
const routes = express.Router()

const ReceiptsController = require("../app/controllers/RecipesController")

routes.get('/', ReceiptsController.index)
routes.get('/search', ReceiptsController.search)
routes.get('/:id', ReceiptsController.show)

module.exports = routes
