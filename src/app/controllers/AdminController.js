const UsersModel = require('../models/UsersModel')
const ChefsModel = require('../models/ChefsModel')
const LoadService = require('../services/LoadService')

const register = 'user'

module.exports = {
  async users(req, res) {
    try {
      let users = await UsersModel.listUsers()

      return res.render('admin/users.njk', {users, register })
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userCreate(req, res) {
    try {
      return res.render('admin/user-create.njk', { register })
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userPost(req, res) {
    try {
      let { name, email, is_admin } = req.body,
      password = 123 // Substituir pelo envio de hash por email para o usuário criar sua senha.

      is_admin === "on"? is_admin = true : is_admin = false

      await UsersModel.saveCreate({name, email, password, is_admin})
      
      return res.redirect('/admin/users')
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userShow(req, res) {
    try {

    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userEdit(req, res) {
    try {
      const {id} = req.params

      let user = await UsersModel.findOne({WHERE: {id}})

      user = {
        id: user.id,
        name:user.name,
        email: user.email,
        is_admin: user.is_admin
      }

      return res.render('admin/user-edit.njk', {user, register })
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userPut(req, res) {
    try {
      let {id, name, email, is_admin} = req.body

      is_admin === "on"? is_admin = true : is_admin = false

      await UsersModel.saveUpdate(id, {name, email, is_admin})

      return res.redirect(`/admin/users`)

    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },
  async userDelete(req, res) {
    try {
      const { id } = req.body

      await UsersModel.delete(id)

      return res.redirect('/admin/users')
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk')
    }
  },


  async chefs(req, res){
    try {
      const chefs = await ChefsModel.findAll()
      return res.render('admin/chefs.njk', {register , chefs })
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  chefCreate(req,res){
    try {
      return res.render('admin/chef-create.njk', { register })
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async chefShow(req,res){
    try {
      const { id } = req.params
      const chef = await ChefsModel.totalRecipes(id)
      const recipes_chef = await LoadService.load('recipes', {WHERE: { chef_id: id }})

      return res.render('admin/chef-show.njk', {chef, recipes_chef, register})
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async chefEdit(req,res){
    try {
      const { id } = req.params
      const chef = await ChefsModel.findOne({WHERE: {id}})

      return res.render('admin/chef-edit.njk', {chef, register})
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async chefPost(req,res){
    try {
      const { name, avatar_url } = req.body

      await ChefsModel.saveCreate({name, avatar_url})
      
      return res.redirect('/admin/chefs')

    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async chefPut(req,res){
    try {
      const {id, name, avatar_url} = req.body

      await ChefsModel.saveUpdate(id, {name, avatar_url})

      return res.redirect(`/admin/chefs/${id}`)

    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
    
  },
  async chefDelete(req,res){
    try {
      const { id } = req.body

      let recipes = await LoadService.load('recipes', {WHERE: { chef_id: id }})

      recipes.map( async recipe => {
        let filesPromise =  recipe.files.map( file => {
          unlinkSync(file.path)
          FilesModel.delete(file.id) }
        )

        await Promise.all(filesPromise)
       
      })

      await ChefsModel.delete(id)

      return res.redirect('/admin/chefs')

    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  }
}