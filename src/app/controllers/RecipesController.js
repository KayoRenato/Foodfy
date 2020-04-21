const RecipeModel = require('../models/RecipesModel')
const LoadRecipe = require('../services/LoadRecipe')

const register = 'public' //será substituido per session posteriormente

module.exports = {
  async index(req, res) {
    try {
      const recipes =  await RecipeModel.recipesSignedBy()

      return res.render('recipes.njk', {items: recipes, register})    
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async show(req, res){
    try {
      const recipe = await LoadRecipe.load('recipe',
        { WHERE: { id: req.params.id }}
      )

      if(!recipe) return res.status(404).render('notFound.njk', {register})

      return res.render('recipe.njk', {recipe, register})
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async search(req,res){
    try {
      const { filter } = req.query

      if(!filter)
        return res.redirect("/")

      const recipes = await RecipeModel.search(filter)

      return res.render('search.njk', {register, recipes, term: filter})
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  }
}