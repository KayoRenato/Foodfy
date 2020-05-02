const RecipeModel = require('../models/RecipesModel')
const FilesModel = require('../models/FilesModel')
const RecipeFileModel = require('../models/RecipeFileModel')
const ChefsModel = require('../models/ChefsModel')
const LoadService = require('../services/LoadService')

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
      const recipes = await LoadService.load('recipes')

      return res.render('user/recipes.njk', {register, recipes })    
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async recipeCreate(req, res){
    try {
      const chefs = await ChefsModel.findAll()

      return res.render('user/recipe-create.njk', { register, chefs })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async recipeShow(req, res){
    try {
      const recipe = await LoadService.load('recipe',
        { WHERE: { id: req.params.id }}
      )

      if(!recipe) return res.status(404).render('parts/notFound.njk', {register})

      return res.render('user/recipe-show.njk', { register, recipe })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async recipeEdit(req, res){
    try {
      const recipe = await LoadService.load('recipe',
      { WHERE: { id: req.params.id }}
    )
      const chefs = await ChefsModel.findAll()

      if(!recipe) return res.status(404).render('parts/notFound.njk', { register })

      return res.render('user/recipe-edit.njk', { register, recipe, chefs })
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', { register })
    }
  },
  async recipePost(req, res){
    try {

      let { title, chef_id, ingredients, preparation, information } = req.body
      
      const keys = Object.keys({ title, ingredients, preparation })

      for(key of keys){
        if(req.body[key] == "")
          return res.redirect('/user/recipes/create')
      }

      if(req.files.length === 0)
        return res.redirect('/user/recipes/create')

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

      return res.redirect('/user/recipes')
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async recipePut(req, res){
    try {
      let { id ,title, chef_id, ingredients, preparation, information } = req.body

      const keys = Object.keys({ title, ingredients, preparation })
      
      for(key of keys){
        if(req.body[key] == ""){
          return res.redirect(`/user/recipes/${id}/edit`)
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
        const recipe = await LoadService.load('recipe', { WHERE: { id }})
        const filesLength = recipe.files.length

        let removedFiles = req.body.removed_files.split(",")
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1)

        if(filesLength === removedFiles.length){
          return res.redirect(`/user/recipes/${id}/edit`)
        }
  
        const removedFilesPromise = removedFiles.map(async fileID => {
          const file = await FilesModel.findOne({WHERE: {id: fileID}}) //Substituir oo find por findOne
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
          return res.redirect(`/user/recipes/${id}/edit`)
      }

      information = information.trim()

      await RecipeModel.saveUpdate(id, {title, chef_id, ingredients, preparation, information })

      return res.redirect(`/user/recipes/${id}`)
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
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

      return res.redirect('/user/recipes') 

    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },

  async chefs(req, res){
    try {
      return res.redirect('/chefs')
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    
    }
  }
  
}