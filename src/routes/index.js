const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')
const SearchController = require('../app/controllers/SearchController')

const recipes = require('./recipes')
const user = require('./user')
const admin = require('./admin')

routes.get('/', HomeController.index)
routes.get('/chefs', HomeController.chefs)
routes.get('/about', HomeController.about)
routes.get('/search', SearchController.index)

routes.use('/recipes', recipes)
routes.use('/admin', admin) //Colocar middleware de validação de acesso.
routes.use('/user', user) //Colocar middleware de validação de acesso.

routes.get('*', (req, res) => {return res.status(404).render('parts/notFound.njk', { register: 'public' })})

module.exports = routes