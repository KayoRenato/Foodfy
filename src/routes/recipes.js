const express = require('express')
const routes = express.Router()

const ReceiptsController = require("../app/controllers/RecipesController")

routes.get('/', ReceiptsController.index)
routes.get('/:index', ReceiptsController.show)

module.exports = routes
