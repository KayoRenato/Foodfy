const dbFoodfy = require('../../../data/dataCardapio') //vai sair depois da persistência dos dados no DB
const register = 'user'

module.exports = {

  index(req, res) {
    try {
      return res.render('admin/index.njk', {register,  items: dbFoodfy })    
    } catch (err) {
      console.error(err);
    }
  },

  show(req, res){
    try {
      const { id } = req.params
      const receita = dbFoodfy[id]

      if(!receita) return res.status(404).render('notFound.njk')

      return res.render('admin/recipe-show.njk', { register, item: receita, id })
      
    } catch (err) {
      console.error(err);
    }
  },

  create(req, res){

  },

  edit(req, res){

  },

  post(req, res){

  },

  put(req, res){

  },

  delete(req, res){

  }

}