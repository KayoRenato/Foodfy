const dbFoodfy = require('../../../data/dataCardapio') //vai sair depois da persistência dos dados no DB

module.exports = {

  index(req, res) {
    try {
      return res.render('recipes.njk', {items: dbFoodfy})    
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk')
    }
  },

  show(req, res){
    try {
      const { index: receitaID } = req.params
      const receita = dbFoodfy[receitaID]

      if(!receita) return res.status(404).render('notFound.njk')

      return res.render('recipe.njk', {item: receita})
      
    } catch (err) {
      console.error(err);
      return res.status(404).render('notFound.njk')
    }
  }
}