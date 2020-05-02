const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')

const UserController = require("../app/controllers/UserController")
const ProfileController = require("../app/controllers/ProfileController")

routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.put('/profile', ProfileController.put)// Atualizar dados usuário

//Colocar middlewares, para apenas mostras as receitas criadas pelo usuário. E apenas ele poder editar e deletar essas receitas.
routes.get('/recipes', UserController.recipes) // mostrará as receitas dele. Adicionar botão para criar receita
routes.get('/recipes/create', UserController.recipeCreate)
routes.post('/recipes', multer.array('photos', 5), UserController.recipePost)
routes.get('/recipes/:id', UserController.recipeShow) // Se a receita for sua, ele poderá editar (botão).
routes.get('/recipes/:id/edit', UserController.recipeEdit) // Apenas se a receita for sua.
routes.put('/recipes', multer.array('photos', 5), UserController.recipePut) //Apenas se a receita for sua.
routes.delete('/recipes', UserController.recipeDelete) //Apenas se a receita for sua.

routes.get('/chefs', UserController.chefs)


module.exports = routes
