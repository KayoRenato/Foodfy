const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')
const SearchController = require('../app/controllers/SearchController')

const recipes = require('./recipes')
const admin = require('./admin')

routes.get('/', HomeController.index)
routes.get('/chefs', HomeController.chefs)
routes.get('/about', HomeController.about)
routes.get('/search', SearchController.index)

routes.use('/recipes', recipes)
routes.use('/admin', admin)

routes.get('*', (req, res) => {return res.status(404).render('notFound.njk', { register: 'public' })})

module.exports = routes