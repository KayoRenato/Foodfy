const dbFoodfy = require('../../../data/dataCardapio') //vai sair depois da persistência dos dados no DB

module.exports = {

  index(req, res) {
    try {
      return res.render('receipts.njk', {items: dbFoodfy})    
    } catch (err) {
      console.error(err);
    }
  },

  show(req, res){
    try {
      const { index: receitaIndex } = req.params
      const receita = dbFoodfy[receitaIndex]

      if(!receita) return res.status(404).render('notFound.njk')

      return res.render('recipe.njk', {item: receita})
      
    } catch (err) {
      console.error(err);
    }
  }
}