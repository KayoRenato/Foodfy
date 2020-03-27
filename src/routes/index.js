const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')

const receipts = require('./receipts')


routes.get('/', HomeController.index)
routes.get('/sobre', HomeController.about)

routes.use('/receitas', receipts)


module.exports = routes