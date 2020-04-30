const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')

const ProfileController = require("../app/controllers/ProfileController")
const UserController = require("../app/controllers/UserController")
const AdminController = require("../app/controllers/AdminController")

// Rotas de perfil de um usuário logado
routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.put('/profile', ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', UserController.list) //Mostrar a lista de usuários cadastrados
routes.post('/users', UserController.post) //Cadastrar um usuário
routes.put('/users', UserController.put) // Editar um usuário
routes.delete('/users', UserController.delete) // Deletar um usuário

routes.get('/recipes', AdminController.recipes)
routes.get('/recipes/create', AdminController.recipeCreate)
routes.get('/recipes/:id', AdminController.recipeShow)
routes.get('/recipes/:id/edit', AdminController.recipeEdit)
routes.post('/recipes', multer.array('photos', 5), AdminController.recipePost)
routes.put('/recipes', multer.array('photos', 5), AdminController.recipePut)
routes.delete('/recipes', AdminController.recipeDelete)

routes.get('/chefs', AdminController.chefs)
routes.get('/chefs/create', AdminController.chefCreate)
routes.get('/chefs/:id', AdminController.chefShow)
routes.get('/chefs/:id/edit', AdminController.chefEdit)
routes.post('/chefs', AdminController.chefPost) 
routes.put('/chefs', AdminController.chefPut)
routes.delete('/chefs', AdminController.chefDelete)


module.exports = routes
