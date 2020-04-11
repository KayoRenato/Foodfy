const dbFoodfy = require('../../../data/dataCardapio') //vai sair depois da persistência dos dados no DB
const RecipeModel = require('../models/RecipesModel')

const register = 'public' //será substituido per session posteriormente

module.exports = {
  //depois transferir consultado de dados do arquivo js para banco de dados postgre
  index(req, res) {
    try {
      return res.render('recipes.njk', {items: dbFoodfy, register})    
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk', {register})
    }
  },
  show(req, res){
    try {
      const { index: receitaID } = req.params
      const receita = dbFoodfy[receitaID]

      if(!receita) return res.status(404).render('notFound.njk', {register})

      return res.render('recipe.njk', {item: receita, register})
      
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