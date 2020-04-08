const fs = require('fs')

const dbFoodfy = require('../../../data/dataCardapio') //vai sair depois da persistência dos dados no DB
const dbFoodfy2 = require('../../../data/data.json') //vai sair depois da persistência dos dados no DB

const RecipeModel = require('../models/RecipesModel')

const register = 'user'

module.exports = {

  index(req, res) {
    try {
      return res.render('admin/index.njk', {register,  items: dbFoodfy })    
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})

    }
  },

  show(req, res){
    try {
      const { id } = req.params
      const recipe = dbFoodfy[id]

      if(!recipe) return res.status(404).render('notFound.njk', {register})

      return res.render('admin/recipe-show.njk', { register, item: recipe, id })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },

  create(req, res){
    try {
      return res.render('admin/recipe-create.njk', { register })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },

  edit(req, res){
    try {
      const { id } = req.params
      const recipe = dbFoodfy2.recipes[id]      

      if(!recipe) return res.status(404).render('notFound.njk', { register })

      return res.render('admin/recipe-edit.njk', { register, recipe, id })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', { register })
    }
  },

  async post(req, res){
    try {

      let { title, author, image, ingredients, preparation, information } = req.body
      
      const keys = Object.keys(req.body)

      for(key of keys){
        if(req.body[key] == "" || req.body[key].length == 0 && key != 'information')
         return res.render('admin/recipe-create.njk', { register })

      }

      function isString(item){
        if(typeof item == 'string')
          return item.split(" ")
        else
          return item
      }

      ingredients = isString(ingredients)
      preparation = isString(preparation)

      RecipeModel.saveCreate({
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

  put(req, res){
    try {
      let { id ,title, author, image, ingredients, preparation, information } = req.body
      
      const keys = Object.keys(req.body)
      
      for(key of keys){
        if(req.body[key] == "" || req.body[key].length == 0 && key != 'information') 
          return res.redirect(`/admin/recipes/${id}/edit`)
      }
      
      let recipe = dbFoodfy2.recipes[id]

      recipe = {
        ...recipe,
        title,
        author,
        image,
        ingredients: ingredients.filter( item => item != ''),
        preparation: preparation.filter( item => item != ''),
        information: information.trim()

      }

      dbFoodfy2.recipes[id] = recipe

      fs.writeFile("data/data.json", JSON.stringify(dbFoodfy2, null, 2), (err) => {
        if(err) return res.send("Write error")

      })

      return res.redirect(`/admin/recipes/${id}/edit`)
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },

  delete(req, res){
    try {
      const { id } = req.body

      const recipesFiltered = dbFoodfy2.recipes.filter(item => {
        return dbFoodfy2.recipes[id] != item;
      })

      dbFoodfy2.recipes = recipesFiltered

      fs.writeFile("data/data.json", JSON.stringify(dbFoodfy2, null, 2), (err) => {
        if(err) return res.send("Write error")

      })

      return res.render('admin/index.njk', {register,  items: dbFoodfy })    

    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  }

}