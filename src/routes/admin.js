const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controllers/ProfileController')
const AdminController = require("../app/controllers/AdminController")

// Rotas de perfil de um usuário logado
routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.put('/profile', ProfileController.put)// Atualizar dados usuário

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', AdminController.users) //Mostrar a lista de usuários cadastrados
routes.get('/users/create', AdminController.userCreate) //Form de Cadastro de um usuário
routes.post('/users', AdminController.userPost) //Cadastrar um usuário
routes.get('/users/:id', AdminController.chefShow) // Mostrar todas as informações do usuário
routes.get('/users/:id/edit', AdminController.userEdit) // Editar um usuário
routes.put('/users', AdminController.userPut) // Atualizar um usuário
routes.delete('/users', AdminController.userDelete) // Deletar um usuário

//Colocar middlewares, para apenas mostras os chefs criados pelo usuário. E apenas ele poder editar e deletar esses chefs.
routes.get('/chefs', AdminController.chefs)
routes.get('/chefs/create', AdminController.chefCreate)
routes.post('/chefs', AdminController.chefPost) 
routes.get('/chefs/:id', AdminController.chefShow)
routes.get('/chefs/:id/edit', AdminController.chefEdit)
routes.put('/chefs', AdminController.chefPut)
routes.delete('/chefs', AdminController.chefDelete)

module.exports = routes
