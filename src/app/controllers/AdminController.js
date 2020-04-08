const fs = require('fs')

const dbFoodfy = require('../../../data/dataCardapio') //vai sair depois da persistência dos dados no DB
const dbFoodfy2 = require('../../../data/data.json') //vai sair depois da persistência dos dados no DB

const RecipeModel = require('../models/RecipesModel')
const ChefsModel = require('../models/ChefsModel')

const register = 'user'

function isString(item){
  if(typeof item == 'string')
    return item.split(" ")
  else
    return item
}

module.exports = {
 //depois transferir consultado de dados do arquivo js para banco de dados postgre
  recipes(req, res) {
    try {
      return res.render('admin/recipes.njk', {register,  items: dbFoodfy })    
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})

    }
  },
  recipeCreate(req, res){
    try {
      return res.render('admin/recipe-create.njk', { register })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async recipeShow(req, res){
    try {
      const { id } = req.params
      const recipe = await RecipeModel.find(id)

      if(!recipe) return res.status(404).render('notFound.njk', {register})

      return res.render('admin/recipe-show.njk', { register, item: recipe, id })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async recipeEdit(req, res){
    try {
      const { id } = req.params
      const recipe = await RecipeModel.find(id)

      if(!recipe) return res.status(404).render('notFound.njk', { register })

      return res.render('admin/recipe-edit.njk', { register, recipe, id })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', { register })
    }
  },
  async recipePost(req, res){
    try {

      let { title, author, image, ingredients, preparation, information } = req.body
      
      const keys = Object.keys(req.body)

      for(key of keys){
        if(req.body[key] == "" || req.body[key].length == 0 && key != 'information')
         return res.render('admin/recipe-create.njk', { register })

      }

      ingredients = isString(ingredients)
      preparation = isString(preparation)

      await RecipeModel.saveCreate({
        title,
        // author,
        image,
        ingredients: ingredients.filter( item => item != ''),
        preparation: preparation.filter( item => item != ''),
        information: information.trim()
      })

      return res.redirect('/admin/recipes')
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async recipePut(req, res){
    try {
      let { id ,title, image, ingredients, preparation, information } = req.body
      
      const keys = Object.keys(req.body)
      
      for(key of keys){
        if(req.body[key] == "" || req.body[key].length == 0 && key != 'information') 
          return res.redirect(`/admin/recipes/${id}/edit`)
      }
      
      ingredients = isString(ingredients)
      ingredients = ingredients.filter( item => item != '')
      
      preparation = isString(preparation)
      preparation = preparation.filter( item => item != '')

      information = information.trim()

      await RecipeModel.saveUpdate(id, {title, image, ingredients, preparation, information })

      return res.redirect(`/admin/recipes/${id}`)
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  recipeDelete(req, res){
    try {
      const { id } = req.body

      RecipeModel.delete(id)

      return res.render('admin/index.njk', {register,  items: dbFoodfy })     //substituir depois por redirect, quando o session for implementado

    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },


  async chefs(req, res){
    const chefs = await ChefsModel.findAll()

    try {
      return res.render('admin/chefs.njk', {register , chefs })
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  chefCreate(req,res){
  },
  async chefShow(req,res){
  },
  chefEdit(req,res){
  },
  async chefPost(req,res){
  },
  async chefPut(req,res){
  },
  chefDelete(req,res){
  }
  
}