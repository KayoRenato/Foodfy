const register = 'public'
const ChefsModel = require('../models/ChefsModel')
const LoadService = require('../services/LoadService')


module.exports = {
  async index(req, res){
    try {
      const recipes = await LoadService.load('recipes')

      return res.render('index.njk', {register , recipes: recipes.slice(0,6)})
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  async chefs(req,res){
    try {
      const chefs = await ChefsModel.totalRecipes()

      return res.render('chefs.njk', {register, chefs})
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  },
  about(req,res) {
    try {
      return res.render('about.njk')
    } catch (err) {
      console.error(err);
      return res.status(404).render('parts/notFound.njk', {register})
    }
  }
}
