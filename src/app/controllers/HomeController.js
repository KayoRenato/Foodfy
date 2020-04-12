const register = 'public'
const ChefsModel = require('../models/ChefsModel')
const RecipesModel = require('../models/RecipesModel')

module.exports = {
  async index(req, res){
    try {
      const recipes = await RecipesModel.recipesSignedBy()

      return res.render('index.njk', {register ,items: recipes.slice(0,6)})
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  async chefs(req,res){
    try {
      const chefs = await ChefsModel.listChefs()

      return res.render('chefs.njk', {register, chefs})
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  about(req,res) {
    try {
      return res.render('about.njk')
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  }
}
