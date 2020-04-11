const register = 'public'
const ChefsModel = require('../models/ChefsModel')

module.exports = {
 //depois transferir consultado de dados do arquivo js para banco de dados postgre
  index(req, res){
    const dbFoodfy = require('../../../data/dataCardapio') //vai sair depois da persistência dos dados no DB

    try {
      return res.render('index.njk', {register ,items: dbFoodfy.slice(0,6)})
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
