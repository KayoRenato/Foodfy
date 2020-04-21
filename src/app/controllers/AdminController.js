const RecipeModel = require('../models/RecipesModel')
const FilesModel = require('../models/FilesModel')
const RecipeFileModel = require('../models/RecipeFileModel')
const ChefsModel = require('../models/ChefsModel')
const LoadRecipe = require('../services/LoadRecipe')

const { unlinkSync } = require('fs')

const register = 'user'

function isString(item){
  if(typeof item == 'string')
    return item.split(" ")
  else
    return item
}

module.exports = {
  async recipes(req, res) {
    try {
      const recipes = await LoadRecipe.load('recipes')

      return res.render('admin/recipes.njk', {register, recipes })    
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async recipeCreate(req, res){
    try {
      const chefs = await ChefsModel.findAll()

      return res.render('admin/recipe-create.njk', { register, chefs })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async recipeShow(req, res){
    try {
      const recipe = await LoadRecipe.load('recipe',
        { WHERE: { id: req.params.id }}
      )

      if(!recipe) return res.status(404).render('notFound.njk', {register})

      return res.render('admin/recipe-show.njk', { register, recipe })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async recipeEdit(req, res){
    try {
      const recipe = await LoadRecipe.load('recipe',
      { WHERE: { id: req.params.id }}
    )
      const chefs = await ChefsModel.findAll()

      if(!recipe) return res.status(404).render('notFound.njk', { register })

      return res.render('admin/recipe-edit.njk', { register, recipe, chefs })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', { register })
    }
  },
  async recipePost(req, res){
    try {

      let { title, chef_id, ingredients, preparation, information } = req.body
      
      const keys = Object.keys({ title, ingredients, preparation })

      for(key of keys){
        if(req.body[key] == "")
          return res.redirect('/admin/recipes/create')
      }

      if(req.files.length === 0)
        return res.redirect('/admin/recipes/create')

      ingredients = isString(ingredients)
      preparation = isString(preparation)

      const recipe_id = await RecipeModel.saveCreate({
        title,
        chef_id,
        ingredients: ingredients.filter( item => item != ''),
        preparation: preparation.filter( item => item != ''),
        information: information.trim()
      })

      const filesPromise = req.files.map(async file => {
        const file_id = await FilesModel.saveCreate({ name: file.filename, path: file.path })
        RecipeFileModel.saveCreate({file_id, recipe_id})
      })
      
      await Promise.all(filesPromise)

      return res.redirect('/admin/recipes')
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async recipePut(req, res){
    try {
      let { id ,title, chef_id, ingredients, preparation, information } = req.body

      const keys = Object.keys({ title, ingredients, preparation })
      
      for(key of keys){
        if(req.body[key] == ""){
          return res.redirect(`/admin/recipes/${id}/edit`)
        }
      }

      if (req.files.length != 0) {
        const filesPromise = req.files.map(async file => {
          const file_id = await FilesModel.saveCreate({ name: file.filename, path: file.path })
          await RecipeFileModel.saveCreate({file_id, recipe_id: id})
        })
      
        await Promise.all(filesPromise)
      }

      if (req.body.removed_files) {
        const recipe = await LoadRecipe.load('recipe', { WHERE: { id }})
        const filesLength = recipe.files.length

        let removedFiles = req.body.removed_files.split(",")
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1)

        if(filesLength === removedFiles.length){
          return res.redirect(`/admin/recipes/${id}/edit`)
        }
  
        const removedFilesPromise = removedFiles.map(async fileID => {
          const file = await FilesModel.find(fileID)
          unlinkSync(file.path)
          FilesModel.delete(fileID)
        })

        await Promise.all(removedFilesPromise)
      }

      ingredients = isString(ingredients)
      ingredients = ingredients.filter( item => item != '')
      
      preparation = isString(preparation)
      preparation = preparation.filter( item => item != '')

      if(!ingredients.length || !preparation.length ){
          return res.redirect(`/admin/recipes/${id}/edit`)
      }

      information = information.trim()

      await RecipeModel.saveUpdate(id, {title, chef_id, ingredients, preparation, information })

      return res.redirect(`/admin/recipes/${id}`)
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async recipeDelete(req, res){
    try {
      const { id } = req.body

      let recipe_files = await RecipeFileModel.findAll({WHERE:{recipe_id: id}})
      
      const removedFilesPromise = recipe_files.map( async rep_file => {
        const file = await FilesModel.find(rep_file.file_id)
        unlinkSync(file.path)
        FilesModel.delete(file.id) 
      })

      await Promise.all(removedFilesPromise)
      
      await RecipeModel.delete(id)

      return res.redirect('/admin/recipes') 

    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },


  async chefs(req, res){
    try {
      const chefs = await ChefsModel.findAll()
      return res.render('admin/chefs.njk', {register , chefs })
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  chefCreate(req,res){
    try {
      return res.render('admin/chef-create.njk', { register })
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async chefShow(req,res){
    try {
      const { id } = req.params
      const chef = await ChefsModel.totalRecipes(id)
      const recipes_chef = await LoadRecipe.load('recipes', {WHERE: { chef_id: id }})

      return res.render('admin/chef-show.njk', {chef, recipes_chef, register})
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async chefEdit(req,res){
    try {
      const { id } = req.params
      const chef = await ChefsModel.find(id)

      return res.render('admin/chef-edit.njk', {chef, register})
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async chefPost(req,res){
    try {
      const { name, avatar_url } = req.body

      const keys = Object.keys({ name, avatar_url })

      for(key of keys){
        if(req.body[key] == "")
          return res.render('admin/chef-create.njk', { register })
      }

      await ChefsModel.saveCreate({name, avatar_url})
      
      return res.redirect('/admin/chefs')

    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async chefPut(req,res){
    try {
      const {id, name, avatar_url} = req.body

      const keys = Object.keys({ name, avatar_url })

      for(key of keys){
        if(req.body[key] == "")
        return res.redirect(`/admin/chefs/${id}/edit`)
      }

      await ChefsModel.saveUpdate(id, {name, avatar_url})

      return res.redirect(`/admin/chefs/${id}`)

    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
    
  },
  async chefDelete(req,res){
    try {
      const { id } = req.body

      let recipes = await LoadRecipe.load('recipes', {WHERE: { chef_id: id }})

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
      return res.status(404).render('notFound.njk', {register})
    }
  }
  
}