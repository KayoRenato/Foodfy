const RecipeModel = require('../models/RecipesModel')
const LoadService = require('../services/LoadService')

const register = 'public' //será substituido per session posteriormente

module.exports = {
  async index(req, res) {
    try {
      const recipes =  await LoadService.load('recipes')

      return res.render('recipes.njk', {recipes, register})    
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async show(req, res){
    try {
      const recipe = await LoadService.load('recipe',
        { WHERE: { id: req.params.id }}
      )

      if(!recipe) return res.status(404).render('notFound.njk', {register})

      return res.render('recipe.njk', {recipe, register})
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  }
}