const express = require('express')
const routes = express.Router()

const ProfileController = require('../app/controllers/ProfileController')
const AdminController = require("../app/controllers/AdminController")

const ValidatorUser = require("../app/middlewares/Validators/user")
const ValidatorChef = require("../app/middlewares/Validators/chef")

// Rotas de perfil de um usuário logado
routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário admin logado (usuário admin, apenas ele pode editar a sí)
routes.put('/profile', ProfileController.put)// Atualizar dados usuário

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', AdminController.users) //Mostrar a lista de usuários cadastrados
routes.get('/users/create', AdminController.userCreate) //Form de Cadastro de um usuário
routes.post('/users', ValidatorUser.post, AdminController.userPost) //Cadastrar um usuário
routes.get('/users/:id', AdminController.userShow) // Mostrar todas as informações do usuário
routes.get('/users/:id/edit', AdminController.userEdit) // Editar um usuário
routes.put('/users', ValidatorUser.put, AdminController.userPut) // Atualizar um usuário
routes.delete('/users', AdminController.userDelete) // Deletar um usuário

//Colocar middlewares, para apenas mostras os chefs criados pelo usuário. E apenas ele poder editar e deletar esses chefs.
routes.get('/chefs', AdminController.chefs)
routes.get('/chefs/create', AdminController.chefCreate)
routes.post('/chefs', ValidatorChef.post, AdminController.chefPost) 
routes.get('/chefs/:id', AdminController.chefShow)
routes.get('/chefs/:id/edit', AdminController.chefEdit)
routes.put('/chefs', ValidatorChef.put, AdminController.chefPut)
routes.delete('/chefs', AdminController.chefDelete)

module.exports = routes
