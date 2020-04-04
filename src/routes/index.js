const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')

const receipts = require('./recipes')
const admin = require('./admin')

routes.get('/', HomeController.index)
routes.get('/about', HomeController.about)

routes.use('/recipes', receipts)
routes.use('/admin', admin)

routes.get('*', (req, res) => {return res.status(404).render('notFound.njk', { register: 'public' })})

module.exports = routes